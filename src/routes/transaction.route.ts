import { Router } from 'express';
import { validator, ParamsType } from '../middlewares/validator.middleware';
import { TransactionsController } from '../controllers/transactions.controller';
import { TransactionFactory } from '../factories/transaction.factory';
import {
  createTransactionSchema,
  getDashboardSchema,
  getTransactionSchema,
} from '../dtos/transactions.dtos';

export const TransactionRoutes = Router();

const transaction = new TransactionsController(
  TransactionFactory.getServiceInstance(),
);

TransactionRoutes.get(
  '/',
  validator({
    schema: getTransactionSchema,
    type: ParamsType.QUERY,
  }),
  transaction.get,
);

TransactionRoutes.get(
  '/dashboard',
  validator({
    schema: getDashboardSchema,
    type: ParamsType.QUERY,
  }),
  transaction.getDashboard,
);

TransactionRoutes.post(
  '/',
  validator({
    schema: createTransactionSchema,
    type: ParamsType.BODY,
  }),
  transaction.create,
);
