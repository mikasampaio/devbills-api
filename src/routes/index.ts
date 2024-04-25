import { Router } from 'express';
import { baseRoutes } from './base.route';
import { categoriesRoutes } from './category.route';
import { TransactionRoutes } from './transaction.route';

export const routes = Router();

routes.use('/', baseRoutes);
routes.use('/categories', categoriesRoutes);
routes.use('/transactions', TransactionRoutes);
