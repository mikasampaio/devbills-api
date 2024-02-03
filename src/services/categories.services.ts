import { CategoriesRepository } from '../database/repositories/categories.repository';
import { CreateCategoryDTO } from '../dtos/categories.dtos';
import { Category } from '../entities/category.entity';
import { AppError } from '../errors/app.errors';
import { StatusCodes } from 'http-status-codes'

export class CategoryServices {
  constructor(private repository: CategoriesRepository) { }

  async create({ title, color }: CreateCategoryDTO): Promise<Category> {
    const foundCategory = await this.repository.findByTitle(title)

    if (foundCategory) {
      throw new AppError('Category already exists', StatusCodes.BAD_REQUEST)
    }

    const category = new Category({
      title: title,
      color: color,
    });

    const createdCategory = await this.repository.create(category)

    return createdCategory;
  }
}
