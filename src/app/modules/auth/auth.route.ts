import express from 'express';
import { AuthController } from './auth.controller';
import { UserController } from '../Users/user.controller';

const router = express.Router();

router.post('/register', UserController.createUser);

router.post('/login', AuthController.loginUser);

export const AuthValidationRoute = router;
