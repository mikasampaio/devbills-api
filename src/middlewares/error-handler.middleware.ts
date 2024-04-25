import { NextFunction, Request, Response } from 'express';
import { AppError } from '../error/app.error';
import { StatusCodes } from 'http-status-codes';

export function errorHandler(
  error: Error | AppError,
  _: Request,
  res: Response,
  __: NextFunction,
) {
  if (error instanceof AppError) {
    return res.status(error.statusCode).json({
      message: error.message,
    });
  }

  return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
    message: error.message,
  });
}
