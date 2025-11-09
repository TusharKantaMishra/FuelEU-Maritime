import { BankEntry } from '../../../core/domain/types';
import { apiClient } from './apiClient';

export const bankingApi = {
  getRecords: (shipId: string, year?: number) =>
    apiClient.get<BankEntry[]>('/banking/records', { shipId, year }),

  bank: (shipId: string, year: number, amount: number) =>
    apiClient.post<BankEntry>('/banking/bank', { shipId, year, amount }),

  apply: (shipId: string, year: number, amount: number) =>
    apiClient.post<{ cbBefore: number; applied: number; cbAfter: number }>('/banking/apply', {
      shipId,
      year,
      amount,
    }),
};
