import { Router } from 'express';
import { CategoriesController } from '../controllers/categories.controller';
import { ParamsType, validate } from '../middlewares/validator.middleware';
import { categorySchema } from '../dtos/categories.dtos';

export const categoriesRoute = Router();
const controller = new CategoriesController();

categoriesRoute.post('/',validate({
    schema: categorySchema,
    type: ParamsType.BODY
}), controller.create);
