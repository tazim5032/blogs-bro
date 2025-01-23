/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextFunction, Request, RequestHandler, Response } from 'express';
import httpStatus from 'http-status';
const notFound = (req: Request, res: Response, next: NextFunction) => {

  res.status(httpStatus.NOT_FOUND).json({

    success: false,

    message: 'Api Not Found !',
    
    error: '',
  });
};

export default notFound;
