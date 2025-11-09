import { Route, RouteComparison, TARGET_INTENSITY_2025 } from '../domain/Route';
import { GetRoutesUseCase, SetBaselineUseCase, ComputeComparisonUseCase } from '../ports/inbound/RouteUseCases';
import { RouteRepository } from '../ports/outbound/RouteRepository';

export class GetRoutesUseCaseImpl implements GetRoutesUseCase {
  constructor(private readonly routeRepository: RouteRepository) {}

  async execute(filters?: {
    vesselType?: string;
    fuelType?: string;
    year?: number;
  }): Promise<Route[]> {
    return this.routeRepository.findAll(filters);
  }
}

export class SetBaselineUseCaseImpl implements SetBaselineUseCase {
  constructor(private readonly routeRepository: RouteRepository) {}

  async execute(routeId: string): Promise<Route> {
    const route = await this.routeRepository.findByRouteId(routeId);
    if (!route) {
      throw new Error(`Route ${routeId} not found`);
    }
    return this.routeRepository.setBaseline(routeId);
  }
}

export class ComputeComparisonUseCaseImpl implements ComputeComparisonUseCase {
  constructor(private readonly routeRepository: RouteRepository) {}

  async execute(): Promise<RouteComparison[]> {
    const baseline = await this.routeRepository.findBaseline();
    if (!baseline) {
      throw new Error('No baseline route set');
    }

    const allRoutes = await this.routeRepository.findAll();
    const comparisons: RouteComparison[] = [];

    for (const route of allRoutes) {
      if (route.routeId === baseline.routeId) continue;

      const percentDiff = ((route.ghgIntensity / baseline.ghgIntensity) - 1) * 100;
      const compliant = route.ghgIntensity <= TARGET_INTENSITY_2025;

      comparisons.push({
        baseline,
        comparison: route,
        percentDiff,
        compliant,
      });
    }

    return comparisons;
  }
}
