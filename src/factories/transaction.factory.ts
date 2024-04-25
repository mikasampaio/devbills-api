import { CategoryRepository } from '../database/repositories/categories.repository';
import { TransactionRepository } from '../database/repositories/transactions.repository';
import { CategoryModel } from '../database/schemas/category.schema';
import { TransactionModel } from '../database/schemas/transaction.schema';
import { CategoriesServices } from '../services/categories.services';
import { TransactionService } from '../services/transactions.services';

export class CategoriesFactory {
  private static categoriesService: CategoriesServices;

  static getServiceInstance() {
    if (this.categoriesService) {
      return this.categoriesService;
    }

    const repository = new CategoryRepository(CategoryModel);
    const services = new CategoriesServices(repository);

    this.categoriesService = services;

    return services;
  }
}

export class TransactionFactory {
  private static transactionService: TransactionService;

  static getServiceInstance() {
    if (this.transactionService) {
      return this.transactionService;
    }
    
    const categoryRepository = new CategoryRepository(CategoryModel)
    const repository = new TransactionRepository(TransactionModel);
    const services = new TransactionService(repository, categoryRepository);

    this.transactionService = services;
    return services;
  }
}
