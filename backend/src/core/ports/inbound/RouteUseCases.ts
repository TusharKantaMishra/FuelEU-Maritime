import { Route, RouteComparison } from '../../domain/Route';

export interface GetRoutesUseCase {
  execute(filters?: {
    vesselType?: string;
    fuelType?: string;
    year?: number;
  }): Promise<Route[]>;
}

export interface SetBaselineUseCase {
  execute(routeId: string): Promise<Route>;
}

export interface ComputeComparisonUseCase {
  execute(): Promise<RouteComparison[]>;
}
