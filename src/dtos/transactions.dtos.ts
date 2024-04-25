import { z } from 'zod';
import { TransactionType } from '../entities/transactions.entity';

export const createTransactionSchema = {
  title: z.string(),
  amount: z.number().int().positive(),
  date: z.coerce.date(),
  categoryId: z.string().length(24),
  type: z.nativeEnum(TransactionType),
};

const createTransactionObject = z.object(createTransactionSchema);
export type CreateTransactionDTO = z.infer<typeof createTransactionObject>;

// Inserindo filtro
export const getTransactionSchema = {
  title: z.string().optional(),
  categoryId: z.string().length(24).optional(),
  startDate: z.coerce.date().optional(),
  endDate: z.coerce.date().optional(),
};

const getTransactionObject = z.object(getTransactionSchema);
export type GetTransactionDTO = z.infer<typeof getTransactionObject>;

export const getDashboardSchema = {
  startDate: z.coerce.date().optional(),
  endDate: z.coerce.date().optional(),
};

const getDashboardObject = z.object(getDashboardSchema);
export type GetDashboardDTO = z.infer<typeof getDashboardObject>;

export const getFinancialSchema = {
  year: z.string(),
}

const getFinancialObject = z.object(getFinancialSchema);
export type GetFinancialDTO = z.infer<typeof getFinancialObject>;

