import express, { Express } from 'express';
import cors from 'cors';
import { createRoutes } from '../../adapters/inbound/http/routes';
import { getPrismaClient } from '../db/prisma';

// Repositories
import { PrismaRouteRepository } from '../../adapters/outbound/postgres/PrismaRouteRepository';
import { PrismaComplianceRepository } from '../../adapters/outbound/postgres/PrismaComplianceRepository';
import { PrismaBankRepository } from '../../adapters/outbound/postgres/PrismaBankRepository';
import { PrismaPoolRepository } from '../../adapters/outbound/postgres/PrismaPoolRepository';

// Use Cases
import { GetRoutesUseCaseImpl, SetBaselineUseCaseImpl, ComputeComparisonUseCaseImpl } from '../../core/application/RouteUseCasesImpl';
import { ComputeCBUseCaseImpl, GetAdjustedCBUseCaseImpl } from '../../core/application/ComplianceUseCasesImpl';
import { BankSurplusUseCaseImpl, ApplyBankedUseCaseImpl, GetBankRecordsUseCaseImpl } from '../../core/application/BankingUseCasesImpl';
import { CreatePoolUseCaseImpl } from '../../core/application/PoolingUseCasesImpl';

// Controllers
import { RouteController } from '../../adapters/inbound/http/RouteController';
import { ComplianceController } from '../../adapters/inbound/http/ComplianceController';
import { BankingController } from '../../adapters/inbound/http/BankingController';
import { PoolingController } from '../../adapters/inbound/http/PoolingController';

export function createApp(): Express {
  const app = express();
  const prisma = getPrismaClient();

  // Middleware
  app.use(cors());
  app.use(express.json());

  // Initialize repositories
  const routeRepository = new PrismaRouteRepository(prisma);
  const complianceRepository = new PrismaComplianceRepository(prisma);
  const bankRepository = new PrismaBankRepository(prisma);
  const poolRepository = new PrismaPoolRepository(prisma);

  // Initialize use cases
  const getRoutesUseCase = new GetRoutesUseCaseImpl(routeRepository);
  const setBaselineUseCase = new SetBaselineUseCaseImpl(routeRepository);
  const computeComparisonUseCase = new ComputeComparisonUseCaseImpl(routeRepository);
  const computeCBUseCase = new ComputeCBUseCaseImpl(complianceRepository, routeRepository);
  const getAdjustedCBUseCase = new GetAdjustedCBUseCaseImpl(complianceRepository, bankRepository);
  const bankSurplusUseCase = new BankSurplusUseCaseImpl(bankRepository, complianceRepository);
  const applyBankedUseCase = new ApplyBankedUseCaseImpl(bankRepository, complianceRepository);
  const getBankRecordsUseCase = new GetBankRecordsUseCaseImpl(bankRepository);
  const createPoolUseCase = new CreatePoolUseCaseImpl(poolRepository);

  // Initialize controllers
  const routeController = new RouteController(
    getRoutesUseCase,
    setBaselineUseCase,
    computeComparisonUseCase
  );
  const complianceController = new ComplianceController(
    computeCBUseCase,
    getAdjustedCBUseCase
  );
  const bankingController = new BankingController(
    bankSurplusUseCase,
    applyBankedUseCase,
    getBankRecordsUseCase
  );
  const poolingController = new PoolingController(createPoolUseCase);

  // Routes
  app.use('/api', createRoutes(
    routeController,
    complianceController,
    bankingController,
    poolingController
  ));

  // Health check
  app.get('/health', (req, res) => {
    res.json({ status: 'ok' });
  });

  return app;
}
