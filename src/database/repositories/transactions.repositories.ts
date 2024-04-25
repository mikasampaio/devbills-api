import {
  GetDashboardDTO,
  GetTransactionDTO,
} from '../../dtos/transactions.dtos';
import { Balance } from '../../entities/balance.entity';
import { Transaction } from '../../entities/transactions.entity';
import { TransactionModel } from '../schemas/transaction.schema';

export class TransactionRepository {
  constructor(private repository: typeof TransactionModel) {}

  async create({
    title,
    amount,
    category,
    date,
    type,
  }: Transaction): Promise<Transaction> {
    const createdTransaction = await this.repository.create({
      title,
      amount,
      category,
      date,
      type,
    });

    return createdTransaction.toObject<Transaction>();
  }

  async get({
    title,
    categoryId,
    startDate,
    endDate,
  }: GetTransactionDTO): Promise<Transaction[]> {
    //Condição de filtragem

    const whereParams: Record<string, unknown> = {
      ...(title && { title: { $regex: title, $options: 'i' } }),
      ...(categoryId && { 'category._id': categoryId }),
    };

    if (startDate || endDate) {
      whereParams.date = {
        ...(startDate && { $gte: startDate }),
        ...(endDate && { $glte: endDate }),
      };
    }

    const transactions = await this.repository.find(whereParams, undefined, {
      sort: { date: -1 },
    });

    return transactions.map((transaction) =>
      transaction.toObject<Transaction>(),
    );
  }

  async getBalance({ startDate, endDate }: GetDashboardDTO): Promise<Balance> {
    const aggregate = this.repository.aggregate<Balance>();

    if (startDate || endDate) {
      aggregate.match({
        date: {
          ...(startDate && { $gte: startDate }),
          ...(endDate && { $lte: endDate }),
        },
      });
    }

    const [result] = await aggregate
      .project({
        _id: 0,
        income: {
          $cond: [
            {
              $eq: ['$type', 'income'],
            },
            '$amount',
            0,
          ],
        },
        expense: {
          $cond: [
            {
              $eq: ['$type', 'expense'],
            },
            '$amount',
            0,
          ],
        },
      })
      .group({
        _id: null,
        incomes: {
          $sum: '$income',
        },
        expenses: {
          $sum: '$expense',
        },
      })
      .addFields({
        balance: {
          $subtract: ['$incomes', '$expenses'],
        },
      });

    return result;
  }
}
