import { TRole } from './user.interface';

export const Role: TRole[] = ['admin', 'user'];

export const USER_ROLE = {
  user: 'user',
  admin: 'admin',
} as const;
