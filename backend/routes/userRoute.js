import express from 'express';
import { loginHandler, profileHandler, signupHandler } from '../controllers/userController';
import authMiddleware from '../middlewares/authMiddleware';
const userRouter = express.Router();

userRouter.post('/signup',signupHandler);
userRouter.post('/login',loginHandler);
userRouter.post('/profile',authMiddleware,profileHandler);


export default userRouter;