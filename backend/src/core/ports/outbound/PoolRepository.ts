import { Pool, PoolMember } from '../../domain/Pool';

export interface PoolRepository {
  create(year: number, members: PoolMember[]): Promise<Pool>;
  
  findById(id: number): Promise<Pool | null>;
  
  findByYear(year: number): Promise<Pool[]>;
}
