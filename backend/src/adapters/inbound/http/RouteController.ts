import { Request, Response } from 'express';
import { GetRoutesUseCase, SetBaselineUseCase, ComputeComparisonUseCase } from '../../../core/ports/inbound/RouteUseCases';

export class RouteController {
  constructor(
    private readonly getRoutesUseCase: GetRoutesUseCase,
    private readonly setBaselineUseCase: SetBaselineUseCase,
    private readonly computeComparisonUseCase: ComputeComparisonUseCase
  ) {}

  getRoutes = async (req: Request, res: Response): Promise<void> => {
    try {
      const { vesselType, fuelType, year } = req.query;
      
      const routes = await this.getRoutesUseCase.execute({
        vesselType: vesselType as string,
        fuelType: fuelType as string,
        year: year ? parseInt(year as string) : undefined,
      });

      res.json(routes);
    } catch (error) {
      res.status(500).json({ error: (error as Error).message });
    }
  };

  setBaseline = async (req: Request, res: Response): Promise<void> => {
    try {
      const { id } = req.params;
      const route = await this.setBaselineUseCase.execute(id);
      res.json(route);
    } catch (error) {
      res.status(400).json({ error: (error as Error).message });
    }
  };

  getComparison = async (_req: Request, res: Response): Promise<void> => {
    try {
      const comparisons = await this.computeComparisonUseCase.execute();
      res.json(comparisons);
    } catch (error) {
      res.status(400).json({ error: (error as Error).message });
    }
  };
}
