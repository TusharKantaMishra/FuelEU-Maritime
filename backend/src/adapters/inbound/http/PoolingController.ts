import { Request, Response } from 'express';
import { CreatePoolUseCase } from '../../../core/ports/inbound/PoolingUseCases';

export class PoolingController {
  constructor(private readonly createPoolUseCase: CreatePoolUseCase) {}

  createPool = async (req: Request, res: Response): Promise<void> => {
    try {
      const { year, members } = req.body;

      if (!year || !members || !Array.isArray(members)) {
        res.status(400).json({ error: 'year and members array are required' });
        return;
      }

      const pool = await this.createPoolUseCase.execute({
        year,
        members,
      });

      res.json(pool);
    } catch (error) {
      res.status(400).json({ error: (error as Error).message });
    }
  };
}
