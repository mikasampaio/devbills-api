import { CategoryRepository } from '../database/repositories/categories.repositories';
import { CreateCategoryDTO } from '../dtos/categories.dtos';
import { Category } from '../entities/category.entity';

import { StatusCodes } from 'http-status-codes';
import { AppError } from '../error/app.error';

export class CategoriesServices {
  constructor(private repository: CategoryRepository) {}

  async create({ title, color }: CreateCategoryDTO): Promise<Category> {
    const foundCategory = await this.repository.findByTitle(title);

    if (foundCategory) {
      throw new AppError('Category already exists', StatusCodes.BAD_REQUEST);
    }

    const category = new Category({
      title,
      color,
    });

    const createdCategory = this.repository.create(category);

    return createdCategory;
  }

  async get(): Promise<Category[]> {
    const categories = await this.repository.get()
    return categories;
  }
}
