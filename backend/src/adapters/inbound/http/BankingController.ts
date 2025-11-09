import { Request, Response } from 'express';
import { BankSurplusUseCase, ApplyBankedUseCase, GetBankRecordsUseCase } from '../../../core/ports/inbound/BankingUseCases';

export class BankingController {
  constructor(
    private readonly bankSurplusUseCase: BankSurplusUseCase,
    private readonly applyBankedUseCase: ApplyBankedUseCase,
    private readonly getBankRecordsUseCase: GetBankRecordsUseCase
  ) {}

  getBankRecords = async (req: Request, res: Response): Promise<void> => {
    try {
      const { shipId, year } = req.query;

      if (!shipId) {
        res.status(400).json({ error: 'shipId is required' });
        return;
      }

      const records = await this.getBankRecordsUseCase.execute(
        shipId as string,
        year ? parseInt(year as string) : undefined
      );

      res.json(records);
    } catch (error) {
      res.status(500).json({ error: (error as Error).message });
    }
  };

  bankSurplus = async (req: Request, res: Response): Promise<void> => {
    try {
      const { shipId, year, amount } = req.body;

      if (!shipId || !year || !amount) {
        res.status(400).json({ error: 'shipId, year, and amount are required' });
        return;
      }

      const entry = await this.bankSurplusUseCase.execute({
        shipId,
        year,
        amount,
      });

      res.json(entry);
    } catch (error) {
      res.status(400).json({ error: (error as Error).message });
    }
  };

  applyBanked = async (req: Request, res: Response): Promise<void> => {
    try {
      const { shipId, year, amount } = req.body;

      if (!shipId || !year || !amount) {
        res.status(400).json({ error: 'shipId, year, and amount are required' });
        return;
      }

      const result = await this.applyBankedUseCase.execute({
        shipId,
        year,
        amount,
      });

      res.json(result);
    } catch (error) {
      res.status(400).json({ error: (error as Error).message });
    }
  };
}
