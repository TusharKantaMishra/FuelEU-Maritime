import { BankEntry } from '../../domain/BankEntry';

export interface BankRepository {
  findByShip(shipId: string, year?: number): Promise<BankEntry[]>;
  
  getTotalBanked(shipId: string, year?: number): Promise<number>;
  
  create(entry: Omit<BankEntry, 'id' | 'createdAt'>): Promise<BankEntry>;
}
