import { Pool, CreatePoolRequest, PoolMember, PoolValidationResult } from '../domain/Pool';
import { CreatePoolUseCase } from '../ports/inbound/PoolingUseCases';
import { PoolRepository } from '../ports/outbound/PoolRepository';

export class CreatePoolUseCaseImpl implements CreatePoolUseCase {
  constructor(private readonly poolRepository: PoolRepository) {}

  async execute(request: CreatePoolRequest): Promise<Pool> {
    // Validate and allocate
    const validation = this.validateAndAllocate(request);
    
    if (!validation.valid) {
      throw new Error(`Pool validation failed: ${validation.errors.join(', ')}`);
    }

    // Create pool
    return this.poolRepository.create(request.year, validation.allocatedMembers!);
  }

  private validateAndAllocate(request: CreatePoolRequest): PoolValidationResult {
    const errors: string[] = [];
    const members = request.members.map(m => ({ ...m, cbAfter: m.cbBefore }));

    // Rule 1: Sum of CB must be >= 0
    const totalCb = members.reduce((sum, m) => sum + m.cbBefore, 0);
    if (totalCb < 0) {
      errors.push('Sum of compliance balances must be >= 0');
      return { valid: false, errors };
    }

    // Greedy allocation: Sort members by CB descending
    const sorted = [...members].sort((a, b) => b.cbBefore - a.cbBefore);
    
    // Identify surplus and deficit ships
    const surplus = sorted.filter(m => m.cbBefore > 0);
    const deficit = sorted.filter(m => m.cbBefore < 0);

    // Transfer surplus to deficits
    for (const deficitShip of deficit) {
      let remaining = Math.abs(deficitShip.cbBefore);
      
      for (const surplusShip of surplus) {
        if (remaining <= 0) break;
        if (surplusShip.cbAfter <= 0) continue;

        const transfer = Math.min(surplusShip.cbAfter, remaining);
        surplusShip.cbAfter -= transfer;
        deficitShip.cbAfter += transfer;
        remaining -= transfer;
      }

      // Rule 2: Deficit ship cannot exit worse
      if (deficitShip.cbAfter < deficitShip.cbBefore) {
        errors.push(`Ship ${deficitShip.shipId} would exit worse than before`);
      }
    }

    // Rule 3: Surplus ship cannot exit negative
    for (const surplusShip of surplus) {
      if (surplusShip.cbAfter < 0) {
        errors.push(`Ship ${surplusShip.shipId} would exit with negative CB`);
      }
    }

    if (errors.length > 0) {
      return { valid: false, errors };
    }

    // Map back to original order with cbAfter values
    const allocatedMembers: PoolMember[] = request.members.map(orig => {
      const allocated = [...surplus, ...deficit].find(m => m.shipId === orig.shipId)!;
      return {
        shipId: allocated.shipId,
        cbBefore: allocated.cbBefore,
        cbAfter: allocated.cbAfter,
      };
    });

    return {
      valid: true,
      errors: [],
      allocatedMembers,
    };
  }
}
