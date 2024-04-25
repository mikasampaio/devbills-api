import { StatusCodes } from 'http-status-codes';
import { CategoryRepository } from '../database/repositories/categories.repository';
import { TransactionRepository } from '../database/repositories/transactions.repository';
import {
  CreateTransactionDTO,
  GetDashboardDTO,
  GetFinancialDTO,
  GetTransactionDTO,
} from '../dtos/transactions.dtos';
import { Transaction } from '../entities/transactions.entity';
import { AppError } from '../error/app.error';
import { Balance } from '../entities/balance.entity';
import { Expense } from '../entities/expense.entity';

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
  }: GetDashboardDTO): Promise<{ balance: Balance; expenses: Expense[] }> {
    let [balance, expenses] = await Promise.all([
      this.transactionRepository.getBalance({
        startDate,
        endDate,
      }),
      this.transactionRepository.getExpenses({
        startDate,
        endDate,
      }),
    ]);

    if (!balance) {
      balance = new Balance({
        _id: null,
        incomes: 0,
        expenses: 0,
        balance: 0,
      });
    }
    return { balance, expenses };
  }

  async getFinancial({ year }: GetFinancialDTO): Promise<Balance[]> {
    const result = await this.transactionRepository.getFinancial({ year });

    return result;
  }
}
