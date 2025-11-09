import { Request, Response } from 'express';
import { ComputeCBUseCase, GetAdjustedCBUseCase } from '../../../core/ports/inbound/ComplianceUseCases';

export class ComplianceController {
  constructor(
    private readonly computeCBUseCase: ComputeCBUseCase,
    private readonly getAdjustedCBUseCase: GetAdjustedCBUseCase
  ) {}

  getComplianceBalance = async (req: Request, res: Response): Promise<void> => {
    try {
      const { shipId, year } = req.query;

      if (!shipId || !year) {
        res.status(400).json({ error: 'shipId and year are required' });
        return;
      }

      const cb = await this.computeCBUseCase.execute(
        shipId as string,
        parseInt(year as string)
      );

      res.json(cb);
    } catch (error) {
      res.status(500).json({ error: (error as Error).message });
    }
  };

  getAdjustedCB = async (req: Request, res: Response): Promise<void> => {
    try {
      const { shipId, year } = req.query;

      if (!shipId || !year) {
        res.status(400).json({ error: 'shipId and year are required' });
        return;
      }

      const adjustedCb = await this.getAdjustedCBUseCase.execute(
        shipId as string,
        parseInt(year as string)
      );

      res.json(adjustedCb);
    } catch (error) {
      res.status(400).json({ error: (error as Error).message });
    }
  };
}
