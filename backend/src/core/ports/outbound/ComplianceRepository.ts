import { ComplianceBalance } from '../../domain/ComplianceBalance';

export interface ComplianceRepository {
  findByShipAndYear(shipId: string, year: number): Promise<ComplianceBalance | null>;
  
  save(cb: ComplianceBalance): Promise<ComplianceBalance>;
  
  update(shipId: string, year: number, cbGco2eq: number): Promise<ComplianceBalance>;
}
