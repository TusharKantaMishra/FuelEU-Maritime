import { Pool, CreatePoolRequest } from '../../../core/domain/types';
import { apiClient } from './apiClient';

export const poolApi = {
  create: (request: CreatePoolRequest) =>
    apiClient.post<Pool>('/pools', request),
};
