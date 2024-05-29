import express from 'express';
import {
  login,
  signup,
  signout,
  getCurrent,
  updateSubscription,
  updateAvatar,
} from '../controllers/authControllers.js';
import authenticate from '../helpers/authenticate.js';
import upload from '../helpers/upload.js';

const authRouter = express.Router();

authRouter.post('/register', signup);

authRouter.post('/login', login);

authRouter.use(authenticate);

authRouter.post('/logout', signout);

authRouter.get('/current', getCurrent);

authRouter.patch(
  '/avatars',
  upload.single('avatar'),
  authenticate,
  updateAvatar
);

authRouter.patch('/:id', updateSubscription);

export default authRouter;
