import Users from '../db/User.js';
import HttpError from '../helpers/HttpError.js';
import { findUser, createUser, updateUser } from '../services/authService.js';
import { passwordCompare, tokenGenerate } from '../helpers/authUtils.js';
import { errorHandling } from '../decorators/errorHandling.js';
import { responseWrapper } from '../decorators/responseWrapper.js';
import validateBody from '../helpers/validateBody.js';
import {
  authLoginSchema,
  authSignupSchema,
  authUpdateSubscriptionSchema,
} from '../schemas/authSchemas.js';
import gravatar from 'gravatar';
import path from 'path';
import fs from 'fs/promises';
import { resize } from '../helpers/resize.js';

const avatarPath = path.resolve('public', 'avatars');

export const signup = errorHandling(async (req, res, next) => {
  const validate = validateBody(authSignupSchema);
  await validate(req, res, next);
  const { email, password } = req.body;
  const user = await findUser({ email });
  if (user) {
    throw HttpError(409, 'Email in use');
  }
  const newUser = await createUser({
    email,
    password,
    avatarURL: gravatar.url(email, { protocol: 'https' }),
  });

  responseWrapper(
    { user: { email: newUser.email, subscription: newUser.subscription } },
    409,
    res,
    201
  );
});

export const login = errorHandling(async (req, res, next) => {
  const validate = validateBody(authLoginSchema);
  await validate(req, res, next);

  const { email, password } = req.body;
  const user = await findUser({ email });
  if (!user) {
    throw HttpError(401, 'Email or password is wrong');
  }

  const compareResult = await passwordCompare(password, user.password);
  if (!compareResult) {
    throw HttpError(401, 'Email or password is wrong');
  }
  const payload = {
    id: user._id,
  };
  const token = tokenGenerate(payload);
  await Users.findByIdAndUpdate(user._id, { token });
  responseWrapper(
    {
      token,
      user: {
        email: user.email,
        subscription: user.subscription,
      },
    },
    401,
    res,
    200
  );
});

export const signout = errorHandling(async (req, res) => {
  const { _id } = req.user;
  const updatedUser = await updateUser({ _id }, { token: '' });

  responseWrapper(updatedUser, 401, res, 204);
});

export const getCurrent = errorHandling((req, res) => {
  const { subscription, email } = req.user;
  responseWrapper({ email, subscription }, 401, res, 200);
});

export const updateSubscription = errorHandling(async (req, res, next) => {
  const validate = validateBody(authUpdateSubscriptionSchema);
  await validate(req, res, next);

  const { _id } = req.user;
  const { subscription } = req.body;
  const updatedUser = await updateUser({ _id }, { subscription });
  responseWrapper(
    { email: updatedUser.email, subscription: updatedUser.subscription },
    404,
    res,
    200
  );
});

export const updateAvatar = errorHandling(async (req, res, next) => {
  const { _id } = req.user;
  const { path: oldPath, filename } = req.file;
  await resize(oldPath);
  const newPath = path.join(avatarPath, filename);
  await fs.rename(oldPath, newPath);
  const avatarURL = path.join('avatars', filename);

  const updatedUser = await updateUser({ _id }, { avatarURL });
  responseWrapper({ avatarURL: updatedUser.avatarURL }, 401, res, 200);
});
