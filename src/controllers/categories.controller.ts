import { NextFunction, Request, Response } from 'express';
import { CategoryServices } from '../services/categories.services';
import { CategoriesRepository } from '../database/repositories/categories.repository';
import { CategoryModel } from '../database/schemas/category.schema';
import { CreateCategoryDTO } from '../dtos/categories.dtos';
import { z } from 'zod'
import { StatusCodes } from 'http-status-codes';

export class CategoriesController {
  async create(req: Request<unknown, unknown, CreateCategoryDTO>, res: Response, next: NextFunction) {
    try{
      const { title, color } = req.body;
      const repository = new CategoriesRepository(CategoryModel)
      const service = new CategoryServices(repository);
  
      const response = await service.create({title, color});
  
      return res.status(StatusCodes.CREATED).json(response);
    } catch(err) {
      next(err)
    }
  }
}
