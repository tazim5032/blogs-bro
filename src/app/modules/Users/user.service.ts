import mongoose from 'mongoose';
import { TUser } from './user.interface';
import { User } from './user.model';
import AppError from '../../errors/AppError';
import httpStatus from 'http-status';
const createUserIngoDB = async (payload: TUser) => {
  const res = await User.create(payload);
  return res;
};

const blockUser = async (id: string) => {
  const user = await User.findOne(new mongoose.Types.ObjectId(id));
  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, 'User not found !!');
  }
  if (user?.isBlocked) {
    throw new AppError(httpStatus.OK, 'User is already blocked !!');
  }

  const res = await User.findByIdAndUpdate(id, {
    $set: {
      isBlocked: true,
    },
  });
  return res;
};
export const UserService = {
  createUserIngoDB,
  blockUser,
};
