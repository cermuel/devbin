import { Request, Response, NextFunction } from 'express';
import RequestValidators from '../types/validator';
export declare function validateRequest(validators: RequestValidators): (req: Request, res: Response, next: NextFunction) => Promise<void>;
