import { Router } from 'express';
import { RouteController } from './RouteController';
import { ComplianceController } from './ComplianceController';
import { BankingController } from './BankingController';
import { PoolingController } from './PoolingController';

export function createRoutes(
  routeController: RouteController,
  complianceController: ComplianceController,
  bankingController: BankingController,
  poolingController: PoolingController
): Router {
  const router = Router();

  // Routes endpoints
  router.get('/routes', routeController.getRoutes);
  router.post('/routes/:id/baseline', routeController.setBaseline);
  router.get('/routes/comparison', routeController.getComparison);

  // Compliance endpoints
  router.get('/compliance/cb', complianceController.getComplianceBalance);
  router.get('/compliance/adjusted-cb', complianceController.getAdjustedCB);

  // Banking endpoints
  router.get('/banking/records', bankingController.getBankRecords);
  router.post('/banking/bank', bankingController.bankSurplus);
  router.post('/banking/apply', bankingController.applyBanked);

  // Pooling endpoints
  router.post('/pools', poolingController.createPool);

  return router;
}
