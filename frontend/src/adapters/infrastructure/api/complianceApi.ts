import { ComplianceBalance, AdjustedComplianceBalance } from '../../../core/domain/types';
import { apiClient } from './apiClient';

export const complianceApi = {
  getCB: (shipId: string, year: number) =>
    apiClient.get<ComplianceBalance>('/compliance/cb', { shipId, year }),

  getAdjustedCB: (shipId: string, year: number) =>
    apiClient.get<AdjustedComplianceBalance>('/compliance/adjusted-cb', { shipId, year }),
};
