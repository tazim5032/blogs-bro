import { AnyZodObject } from 'zod';
import catchAsync from '../Utils/catchAsync';
import { NextFunction, Request, Response } from 'express';

const ValidateRequest = (schema: AnyZodObject) => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  return catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    await schema.parseAsync({
      body: req.body,
      cookies: req.cookies,
    });
    next();
  });
};
export default ValidateRequest;
