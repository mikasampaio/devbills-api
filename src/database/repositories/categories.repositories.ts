import { Category } from '../../entities/category.entity';
import { CategoryModel } from '../schemas/category.schema';

export class CategoryRepository {
  constructor(private repository: typeof CategoryModel) {}

  async create({ title, color }: Category): Promise<Category>{
    const createdCategory = await this.repository.create({ title, color });

    return createdCategory.toObject<Category>()
  }

  async findByTitle(title: string): Promise<Category | undefined> {
    const category = await this.repository.findOne({ title });

    return category?.toObject<Category>()
  }

  async findById(id: string): Promise<Category | undefined> {
    const category = await this.repository.findById(id);

    return category?.toObject<Category>()
  }

  async get(): Promise<Category[]> {
    const categories = await this.repository.find();

    return categories.map((category) => category.toObject<Category>());
  }
}
