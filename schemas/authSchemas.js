import Joi from 'joi';
import { userEmailRegexp } from '../constants/userConstants.js';

export const authSignupSchema = Joi.object({
  email: Joi.string().pattern(userEmailRegexp).required(),
  password: Joi.string().min(6).required(),
});

export const authLoginSchema = Joi.object({
  email: Joi.string().pattern(userEmailRegexp).required(),
  password: Joi.string().min(6).required(),
});

export const authUpdateSubscriptionSchema = Joi.object({
  subscription: Joi.string().valid('starter', 'pro', 'business').required(),
});

export const authVerifySchema = Joi.object({
  email: Joi.string().pattern(userEmailRegexp).required(),
});
