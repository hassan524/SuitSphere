import express from 'express';
import { UserLogin, UserSignUp, AuthCheck, LogOut } from '../controller/authController';
import asyncErrorHandler from '../utils/AsyncErrorHandler';
import { authMiddleware } from '../middlewares/authMiddleware';

const router = express.Router();

router.post('/login', asyncErrorHandler(UserLogin));
router.post('/signup', asyncErrorHandler(UserSignUp));
router.get('/authcheck', asyncErrorHandler(AuthCheck));

router.post('/logout', authMiddleware, asyncErrorHandler(LogOut))

export default router;
