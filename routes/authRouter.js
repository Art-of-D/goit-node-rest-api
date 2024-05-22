import express from 'express';
import {
  login,
  signup,
  signout,
  getCurrent,
  updateSubscription,
} from '../controllers/authControllers.js';
import authenticate from '../helpers/authenticate.js';

const authRouter = express.Router();

authRouter.post('/login', login);

authRouter.post('/register', signup);

authRouter.post('/logout', authenticate, signout);

authRouter.get('/current', authenticate, getCurrent);

authRouter.patch('/:id', authenticate, updateSubscription);

export default authRouter;
