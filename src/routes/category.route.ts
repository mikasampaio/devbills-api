import { Router } from 'express';
import { CategoriesController } from '../controllers/categories.controller';
import { validator, ParamsType } from '../middlewares/validator.middleware';
import { createCategorySchema } from '../dtos/categories.dtos';
import { CategoriesFactory } from '../factories/categories.factory';

export const categoriesRoutes = Router();
const category = new CategoriesController(
  CategoriesFactory.getServiceInstance(),
);

categoriesRoutes.get('/', category.get);

categoriesRoutes.post(
  '/',
  validator({
    schema: createCategorySchema,
    type: ParamsType.BODY,
  }),
  category.create,
);
