import { Router } from 'express';
import { UserRoutes } from '../modules/Users/user.route';
import { BlogsRoute } from '../modules/blogs/blogs.route';
import { AuthValidationRoute } from '../modules/auth/auth.route';
import { AdminRoutes } from '../modules/Users/user.admin.route';

const router = Router();

const moduleroutes = [
  {
    path: '/users',
    route: UserRoutes,
  },
  {
    path: '/blogs',
    route: BlogsRoute,
  },
  {
    path: '/auth',
    route: AuthValidationRoute,
  },
  {
    path: '/admin',
    route: AdminRoutes,
  },
];

moduleroutes.forEach((route) => router.use(route.path, route.route));

export default router;
