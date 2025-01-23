import AppError from '../../errors/AppError';
import { User } from '../Users/user.model';
import { TLoginUser } from './auth.interface';
import httpStatus from 'http-status';
import { createToken } from './auth.utils';
import config from '../../config';
const loginUser = async (paylod: TLoginUser) => {
  const { email } = paylod;

  const user = await User.isUserExistsByEmail(email);
  if (!user) {
    throw new AppError(httpStatus.UNAUTHORIZED, 'Invalid credentials!');
  }

  const userStatus = user?.isBlocked;
  if (userStatus) {
    throw new AppError(httpStatus.UNAUTHORIZED, 'Invalid credentials!');
  }

  const isPassMatched = await User.isPasswordMaatched(
    paylod?.password,
    user?.password,
  );
  if (!isPassMatched) {
    throw new AppError(httpStatus.UNAUTHORIZED, 'Invalid credentials!');
  }

  const jwtPayload = {
    email: user.email,
    role: user.role,
  };

  const accessToken = createToken(
    jwtPayload,
    config.access_secret as string,
    config.access_expire as string,
  );

  return { token: accessToken };
};

export const AuthServices = {
  loginUser,
};
