import { NextFunction, Request, Response } from 'express';
import { CategoriesServices } from '../services/categories.services';
import { CreateCategoryDTO } from '../dtos/categories.dtos';
import { StatusCodes } from 'http-status-codes';
import { BodyRequest } from './types';

export class CategoriesController {
  constructor(private categoriesService: CategoriesServices) {}
  create = async (
    req: BodyRequest<CreateCategoryDTO>,
    res: Response,
    next: NextFunction,
  ) => {
    try {
      const { title, color } = req.body;
      const response = await this.categoriesService.create({ title, color });

      return res.status(StatusCodes.CREATED).json(response);
    } catch (error) {
      next(error);
    }
  };

  get = async (_: Request, res: Response, next: NextFunction) => {
    try {
      const response = await this.categoriesService.get();

      return res.status(StatusCodes.OK).json(response);
    } catch (error) {
      next(error);
    }
  };
}
