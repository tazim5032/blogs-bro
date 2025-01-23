import express from 'express';
import { UserController } from './user.controller';
import ValidateRequest from '../../middlewares/validateRequests';
import { UserValidation } from './user.validation';
import Auth from '../../middlewares/auth';
import { BlogController } from '../blogs/blogs.controller';

const router = express.Router();

router.patch(
  '/users/:userId/block',
  Auth('admin'),
  ValidateRequest(UserValidation.blockUserValidation),
  UserController.blockUser,
);
router.delete('/blogs/:id', Auth('admin'), BlogController.adminDeleteBlog);

export const AdminRoutes = router;
