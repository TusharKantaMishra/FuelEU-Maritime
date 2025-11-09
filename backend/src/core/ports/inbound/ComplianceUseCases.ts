import { ComplianceBalance, AdjustedComplianceBalance } from '../../domain/ComplianceBalance';

export interface ComputeCBUseCase {
  execute(shipId: string, year: number): Promise<ComplianceBalance>;
}

export interface GetAdjustedCBUseCase {
  execute(shipId: string, year: number): Promise<AdjustedComplianceBalance>;
}
