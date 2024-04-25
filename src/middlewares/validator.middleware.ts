import { NextFunction, Request, Response, response } from 'express';
import { ZodRawShape, z } from 'zod';
import { AppError } from '../error/app.error';
import { StatusCodes } from 'http-status-codes';

export enum ParamsType {
  QUERY = 'query',
  BODY = 'body',
}

type ValidateParams = {
  schema: ZodRawShape;
  type: ParamsType;
};

export function validator(params: ValidateParams) {
  return (req: Request, res: Response, next: NextFunction) => {
    const response = z.object(params.schema).safeParse(req[params.type]);
    if (!response.success) {
      const errorFormatted = response.error.issues.map(
        (item) => `${item.path.join('.')}: ${item.message}`,
      );
      throw new AppError(errorFormatted, StatusCodes.UNPROCESSABLE_ENTITY);
    }

    req[params.type] = response.data;

    next();
  };
}
