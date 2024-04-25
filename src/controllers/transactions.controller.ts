import { NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import {
  CreateTransactionDTO,
  GetDashboardDTO,
  GetFinancialDTO,
  GetTransactionDTO,
} from '../dtos/transactions.dtos';
import { TransactionService } from '../services/transactions.services';
import { BodyRequest, QueryRequest } from './types';

export class TransactionsController {
  constructor(private transactionsService: TransactionService) {}

  create = async (
    req: BodyRequest<CreateTransactionDTO>,
    res: Response,
    next: NextFunction,
  ) => {
    try {
      const { title, amount, categoryId, date, type } = req.body;
      const response = await this.transactionsService.create({
        title,
        amount,
        categoryId,
        date,
        type,
      });

      return res.status(StatusCodes.CREATED).json(response);
    } catch (error) {
      next(error);
    }
  };

  get = async (
    req: QueryRequest<GetTransactionDTO>,
    res: Response,
    next: NextFunction,
  ) => {
    try {
      const { title, categoryId, startDate, endDate } = req.query;
      const response = await this.transactionsService.get({
        title,
        categoryId,
        startDate,
        endDate,
      });

      return res.status(StatusCodes.OK).json(response);
    } catch (error) {
      next(error);
    }
  };

  getDashboard = async (
    req: QueryRequest<GetDashboardDTO>,
    res: Response,
    next: NextFunction,
  ) => {
    try {
      const { startDate, endDate } = req.query;
      const response = await this.transactionsService.getDashboard({
        startDate,
        endDate,
      });

      return res.status(StatusCodes.OK).json(response);
    } catch (error) {
      next(error);
    }
  };

  getFinancial = async (
    req: QueryRequest<GetFinancialDTO>,
    res: Response,
    next: NextFunction,
  ) => {
    try {
      const { year } = req.query;
      const response = await this.transactionsService.getFinancial({
        year,
      });

      return res.status(StatusCodes.OK).json(response);
    } catch (error) {
      next(error);
    }
  };
}
