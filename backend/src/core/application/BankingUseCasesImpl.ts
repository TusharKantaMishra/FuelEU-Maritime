import { BankEntry, BankOperation } from '../domain/BankEntry';
import { BankSurplusUseCase, ApplyBankedUseCase, GetBankRecordsUseCase } from '../ports/inbound/BankingUseCases';
import { BankRepository } from '../ports/outbound/BankRepository';
import { ComplianceRepository } from '../ports/outbound/ComplianceRepository';

export class BankSurplusUseCaseImpl implements BankSurplusUseCase {
  constructor(
    private readonly bankRepository: BankRepository,
    private readonly complianceRepository: ComplianceRepository
  ) {}

  async execute(operation: BankOperation): Promise<BankEntry> {
    // Validate positive CB
    const cb = await this.complianceRepository.findByShipAndYear(
      operation.shipId,
      operation.year
    );
    
    if (!cb) {
      throw new Error(`No compliance balance found for ship ${operation.shipId}`);
    }

    if (cb.cbGco2eq <= 0) {
      throw new Error('Cannot bank negative or zero compliance balance');
    }

    if (operation.amount > cb.cbGco2eq) {
      throw new Error(`Cannot bank more than available surplus (${cb.cbGco2eq})`);
    }

    // Create bank entry
    return this.bankRepository.create({
      shipId: operation.shipId,
      year: operation.year,
      amountGco2eq: operation.amount,
    });
  }
}

export class ApplyBankedUseCaseImpl implements ApplyBankedUseCase {
  constructor(
    private readonly bankRepository: BankRepository,
    private readonly complianceRepository: ComplianceRepository
  ) {}

  async execute(operation: BankOperation): Promise<{
    cbBefore: number;
    applied: number;
    cbAfter: number;
  }> {
    const cb = await this.complianceRepository.findByShipAndYear(
      operation.shipId,
      operation.year
    );
    
    if (!cb) {
      throw new Error(`No compliance balance found for ship ${operation.shipId}`);
    }

    const totalBanked = await this.bankRepository.getTotalBanked(operation.shipId);
    
    if (operation.amount > totalBanked) {
      throw new Error(`Cannot apply more than banked amount (${totalBanked})`);
    }

    // Apply banked surplus (negative amount to deduct from bank)
    await this.bankRepository.create({
      shipId: operation.shipId,
      year: operation.year,
      amountGco2eq: -operation.amount,
    });

    // Update CB
    const cbAfter = cb.cbGco2eq + operation.amount;
    await this.complianceRepository.update(operation.shipId, operation.year, cbAfter);

    return {
      cbBefore: cb.cbGco2eq,
      applied: operation.amount,
      cbAfter,
    };
  }
}

export class GetBankRecordsUseCaseImpl implements GetBankRecordsUseCase {
  constructor(private readonly bankRepository: BankRepository) {}

  async execute(shipId: string, year?: number): Promise<BankEntry[]> {
    return this.bankRepository.findByShip(shipId, year);
  }
}
