import {  ZodError } from 'zod';
import { Request, Response, NextFunction } from 'express';
import RequestValidators from '../types/validator';
import { StatusCodes } from 'http-status-codes';
import * as CustomError from '../errors/';

export function validateRequest(validators: RequestValidators) {
    return async (req: Request, res: Response, next: NextFunction)=> {
      try {
        if (validators.body) {
          req.body = await validators.body.parseAsync(req.body);
        }
        if (validators.params) {
          req.params = await validators.params.parseAsync(req.params);
        }
        if (validators.query) {
          req.query = await validators.query.parseAsync(req.query);
        }
        next();
      } catch (error) {
        if (error instanceof ZodError) {
          throw new CustomError.CustomAPIError(error.message, StatusCodes.UNPROCESSABLE_ENTITY)
        }
        throw new CustomError.BadRequestError(error.message);
      }
    };
}