import { Route, RouteComparison } from '../../../core/domain/types';
import { apiClient } from './apiClient';

export const routeApi = {
  getAll: (filters?: { vesselType?: string; fuelType?: string; year?: number }) =>
    apiClient.get<Route[]>('/routes', filters),

  setBaseline: (routeId: string) =>
    apiClient.post<Route>(`/routes/${routeId}/baseline`),

  getComparison: () =>
    apiClient.get<RouteComparison[]>('/routes/comparison'),
};
