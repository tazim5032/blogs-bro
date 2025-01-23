import catchAsync from '../../Utils/catchAsync';
import sendResponse from '../../Utils/sendResponse';
import httpStatus from 'http-status';
import { UserService } from './user.service';

const createUser = catchAsync(async (req, res) => {
  const result = await UserService.createUserIngoDB(req.body);
  const { _id, email, name } = result;
  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: 'User registered successfully',
    data: {
      _id,
      name,
      email,
    },
  });
});

const blockUser = catchAsync(async (req, res) => {
  const { userId } = req.params;
  await UserService.blockUser(userId);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'User blocked successfully',
    data: {},
  });
});

export const UserController = {
  createUser,
  blockUser,
};
