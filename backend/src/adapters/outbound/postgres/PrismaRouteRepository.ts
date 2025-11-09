import { PrismaClient } from '@prisma/client';
import { Route } from '../../../core/domain/Route';
import { RouteRepository } from '../../../core/ports/outbound/RouteRepository';

export class PrismaRouteRepository implements RouteRepository {
  constructor(private readonly prisma: PrismaClient) {}

  async findAll(filters?: {
    vesselType?: string;
    fuelType?: string;
    year?: number;
  }): Promise<Route[]> {
    const routes = await this.prisma.route.findMany({
      where: {
        ...(filters?.vesselType && { vesselType: filters.vesselType }),
        ...(filters?.fuelType && { fuelType: filters.fuelType }),
        ...(filters?.year && { year: filters.year }),
      },
      orderBy: { year: 'asc' },
    });

    return routes.map(this.toDomain);
  }

  async findById(id: number): Promise<Route | null> {
    const route = await this.prisma.route.findUnique({ where: { id } });
    return route ? this.toDomain(route) : null;
  }

  async findByRouteId(routeId: string): Promise<Route | null> {
    const route = await this.prisma.route.findUnique({ where: { routeId } });
    return route ? this.toDomain(route) : null;
  }

  async findBaseline(): Promise<Route | null> {
    const route = await this.prisma.route.findFirst({
      where: { isBaseline: true },
    });
    return route ? this.toDomain(route) : null;
  }

  async setBaseline(routeId: string): Promise<Route> {
    // Clear existing baseline
    await this.prisma.route.updateMany({
      where: { isBaseline: true },
      data: { isBaseline: false },
    });

    // Set new baseline
    const route = await this.prisma.route.update({
      where: { routeId },
      data: { isBaseline: true },
    });

    return this.toDomain(route);
  }

  async create(route: Omit<Route, 'id'>): Promise<Route> {
    const created = await this.prisma.route.create({
      data: {
        routeId: route.routeId,
        vesselType: route.vesselType,
        fuelType: route.fuelType,
        year: route.year,
        ghgIntensity: route.ghgIntensity,
        fuelConsumption: route.fuelConsumption,
        distance: route.distance,
        totalEmissions: route.totalEmissions,
        isBaseline: route.isBaseline,
      },
    });

    return this.toDomain(created);
  }

  private toDomain(prismaRoute: any): Route {
    return {
      id: prismaRoute.id,
      routeId: prismaRoute.routeId,
      vesselType: prismaRoute.vesselType,
      fuelType: prismaRoute.fuelType,
      year: prismaRoute.year,
      ghgIntensity: prismaRoute.ghgIntensity,
      fuelConsumption: prismaRoute.fuelConsumption,
      distance: prismaRoute.distance,
      totalEmissions: prismaRoute.totalEmissions,
      isBaseline: prismaRoute.isBaseline,
    };
  }
}
