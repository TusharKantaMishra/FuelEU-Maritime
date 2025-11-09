import { BankEntry, BankOperation } from '../../domain/BankEntry';

export interface BankSurplusUseCase {
  execute(operation: BankOperation): Promise<BankEntry>;
}

export interface ApplyBankedUseCase {
  execute(operation: BankOperation): Promise<{
    cbBefore: number;
    applied: number;
    cbAfter: number;
  }>;
}

export interface GetBankRecordsUseCase {
  execute(shipId: string, year?: number): Promise<BankEntry[]>;
}
