import config from '../config';
import AppError from '../errors/AppError';
import { TUserRole } from '../modules/Users/user.interface';
import catchAsync from '../Utils/catchAsync';
import { NextFunction, Request, Response } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';
import { User } from '../modules/Users/user.model';
import httpStatus from 'http-status';
const Auth = (...requiredRole: TUserRole[]) => {
  return catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    let token = req.headers.authorization;

    if (token && token.startsWith('Bearer ')) {
      token = token.split(' ')[1]; // Extract the actual token after "Bearer"
    }

    if (!token) {
      throw new AppError(httpStatus.UNAUTHORIZED, 'You are not authorized!');
    }

    const decoded = jwt.verify(
      token,
      config.access_secret as string,
    ) as JwtPayload;

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { role, email, iat } = decoded;

    const user = await User.isUserExistsByEmail(email);

    if (!user) {
      throw new AppError(httpStatus.NOT_FOUND, 'User not found!');
    }

    const userStatus = user?.isBlocked;
    if (userStatus) {
      throw new AppError(httpStatus.UNAUTHORIZED, 'You are not authorized!');
    }

    if (requiredRole && !requiredRole.includes(role)) {
      throw new AppError(httpStatus.UNAUTHORIZED, 'You are not authorized!');
    }

    req.user = decoded as JwtPayload;

    next();
  });
};

export default Auth;
