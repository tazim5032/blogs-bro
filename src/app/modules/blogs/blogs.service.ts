import { Types } from "mongoose";
import { User } from "../Users/user.model";
import { TBlog } from "./blogs.interface";
import AppError from "../../errors/AppError";
import { Blog } from "./blogs.model";
import QueryBuilder from "../../builder/QueryBuilder";
import { blogSearchBy } from "./blogs.searchBy";
import httpStatus from 'http-status';

const createBlogIntoDB = async (payload: TBlog, email: string) => {
  const user = await User.findOne({ email });
  const id: Types.ObjectId = new Types.ObjectId(user?._id);
  payload.author = id;
  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, 'User is not found');
  }
  const res = await Blog.create(payload);
  return res;
};

const updateBlogIntoDB = async (
  id: string,
  payload: Partial<TBlog>,
  email: string,
) => {
  const isBlogExists = await Blog.findById(id);

  if (!isBlogExists) {
    throw new AppError(httpStatus.NOT_FOUND, 'Blog is not found!');
  }

  const user = await User.findById(isBlogExists.author);
  if (email !== user?.email) {
    throw new AppError(
      httpStatus.UNAUTHORIZED,
      'You are Unathorized to update !!',
    );
  }
  const res = await Blog.findByIdAndUpdate(id, payload, { new: true }).populate(
    'author',
  );
  return res;
};

const deleteBlogFromDB = async (id: string, email: string) => {
  const isBlogExists = await Blog.findById(id);

  if (!isBlogExists) {
    throw new AppError(httpStatus.NOT_FOUND, 'Blog is not found!');
  }

  const user = await User.findById(isBlogExists.author);
  if (email !== user?.email) {
    throw new AppError(
      httpStatus.UNAUTHORIZED,
      'Unathorized to delete !!',
    );
  }

  const res = await Blog.findByIdAndDelete(id);
  return res;
};

const getAllBlogs = async (query: Record<string, unknown>) => {
  const blogQuery = new QueryBuilder(Blog.find().populate('author'), query)
    .search(blogSearchBy)
    .filter()
    .sort()
    .sortOrder();

  const res = await blogQuery.modelQuery;
  return res;
};

const deleteBlogByAdmin = async (id: string) => {
  const blog = await Blog.findById(id);
  if (!blog) {
    throw new AppError(httpStatus.NOT_FOUND, 'Blog not found!!');
  }
  const res = await Blog.findByIdAndDelete(id);
  return res;
};

export const blogService = {
  createBlogIntoDB,
  updateBlogIntoDB,
  deleteBlogFromDB,
  getAllBlogs,
  deleteBlogByAdmin,
};
