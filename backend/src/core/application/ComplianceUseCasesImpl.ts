import { ComplianceBalance, AdjustedComplianceBalance } from '../domain/ComplianceBalance';
import { ENERGY_CONVERSION_FACTOR, TARGET_INTENSITY_2025 } from '../domain/Route';
import { ComputeCBUseCase, GetAdjustedCBUseCase } from '../ports/inbound/ComplianceUseCases';
import { ComplianceRepository } from '../ports/outbound/ComplianceRepository';
import { RouteRepository } from '../ports/outbound/RouteRepository';
import { BankRepository } from '../ports/outbound/BankRepository';

export class ComputeCBUseCaseImpl implements ComputeCBUseCase {
  constructor(
    private readonly complianceRepository: ComplianceRepository,
    private readonly routeRepository: RouteRepository
  ) {}

  async execute(shipId: string, year: number): Promise<ComplianceBalance> {
    // For demo purposes, we'll use route data as a proxy for ship data
    // Map ships to specific routes for testing:
    // SHIP-001 -> R001 (deficit)
    // SHIP-002 -> R002 (surplus - LNG, 88.0)
    // SHIP-003 -> R003 (deficit)
    // SHIP-004 -> R004 (surplus - 89.2)
    
    const routeMapping: Record<string, string> = {
      'SHIP-001': 'R001',
      'SHIP-002': 'R002', // Compliant with surplus
      'SHIP-003': 'R003',
      'SHIP-004': 'R004', // Compliant with surplus
    };

    const targetRouteId = routeMapping[shipId] || 'R001';
    const route = await this.routeRepository.findByRouteId(targetRouteId);
    
    if (!route) {
      throw new Error(`No route data found for ship ${shipId}`);
    }
    
    // Calculate compliance balance
    const energyInScope = route.fuelConsumption * ENERGY_CONVERSION_FACTOR;
    const cbGco2eq = (TARGET_INTENSITY_2025 - route.ghgIntensity) * energyInScope;

    const cb: ComplianceBalance = {
      shipId,
      year,
      cbGco2eq,
    };

    // Save or update
    const existing = await this.complianceRepository.findByShipAndYear(shipId, year);
    if (existing) {
      return this.complianceRepository.update(shipId, year, cbGco2eq);
    }
    
    return this.complianceRepository.save(cb);
  }
}

export class GetAdjustedCBUseCaseImpl implements GetAdjustedCBUseCase {
  constructor(
    private readonly complianceRepository: ComplianceRepository,
    private readonly bankRepository: BankRepository
  ) {}

  async execute(shipId: string, year: number): Promise<AdjustedComplianceBalance> {
    const cb = await this.complianceRepository.findByShipAndYear(shipId, year);
    if (!cb) {
      throw new Error(`No compliance balance found for ship ${shipId} in year ${year}`);
    }

    const bankedAmount = await this.bankRepository.getTotalBanked(shipId, year);
    const adjustedCb = cb.cbGco2eq + bankedAmount;

    return {
      ...cb,
      bankedAmount,
      adjustedCb,
    };
  }
}
