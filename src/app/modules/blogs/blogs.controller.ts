import catchAsync from '../../Utils/catchAsync';
import sendResponse from '../../Utils/sendResponse';
import httpStatus from 'http-status';
import { blogService } from './blogs.service';

const createBlog = catchAsync(async (req, res) => {
  const user = req.user;
  const { email } = user;

  const result = await blogService.createBlogIntoDB(req.body, email);

  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: 'Blog created successfully',
    data: result,
  });
});

const getBlogs = catchAsync(async (req, res) => {
  const result = await blogService.getAllBlogs(req.query);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Blogs fetched successfully',
    data: result,
  });
});

const updateBlog = catchAsync(async (req, res) => {
  const { id } = req.params;
  const { email } = req.user;

  const result = await blogService.updateBlogIntoDB(
    id as string,
    req.body,
    email,
  );

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Blog updated successfully',
    data: result,
  });
});

const deleteBlog = catchAsync(async (req, res) => {
  const { id } = req.params;
  const { email } = req.user;

  await blogService.deleteBlogFromDB(id, email);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Blog deleted successfully',
    data: null,
  });
});

const adminDeleteBlog = catchAsync(async (req, res) => {
  const { id } = req.params;
  await blogService.deleteBlogByAdmin(id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Blog deleted successfully',
    data: {},
  });
});

export const BlogController = {
  createBlog,
  updateBlog,
  deleteBlog,
  getBlogs,
  adminDeleteBlog,
};
