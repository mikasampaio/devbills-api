import { StatusCodes } from 'http-status-codes';
import { CategoryRepository } from '../database/repositories/categories.repositories';
import { TransactionRepository } from '../database/repositories/transactions.repositories';
import {
  CreateTransactionDTO,
  GetDashboardDTO,
  GetTransactionDTO,
} from '../dtos/transactions.dtos';
import { Transaction } from '../entities/transactions.entity';
import { AppError } from '../error/app.error';
import { Balance } from '../entities/balance.entity';

export class TransactionService {
  constructor(
    private transactionRepository: TransactionRepository,
    private categoriesRepository: CategoryRepository,
  ) {}

  async create({
    title,
    amount,
    categoryId,
    date,
    type,
  }: CreateTransactionDTO): Promise<Transaction> {
    const category = await this.categoriesRepository.findById(categoryId);

    if (!category) {
      throw new AppError('Category does not exist', StatusCodes.NOT_FOUND);
    }

    const transaction = new Transaction({
      title,
      amount,
      category,
      date,
      type,
    });

    const createdTransaction =
      await this.transactionRepository.create(transaction);

    return createdTransaction;
  }

  async get(filter: GetTransactionDTO): Promise<Transaction[]> {
    const transaction = await this.transactionRepository.get(filter);

    return transaction;
  }

  async getDashboard({
    startDate,
    endDate,
  }: GetDashboardDTO) {
    let balance = await this.transactionRepository.getBalance({
      startDate,
      endDate,
    });

    if (!balance) {
      balance = new Balance({
        _id: null,
        incomes: 0,
        expenses: 0,
        balance: 0,
      });
    }
    return balance;
  }
}

//CONTROLLER -> FACTORY -> ROUTES
