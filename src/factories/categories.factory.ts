import { CategoryRepository } from '../database/repositories/categories.repositories';
import { CategoryModel } from '../database/schemas/category.schema';
import { CategoriesServices } from '../services/categories.services';

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
