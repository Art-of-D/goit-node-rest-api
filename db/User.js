import { Schema, model } from 'mongoose';
import { handleChangeError } from './hooks.js';

const userSchema = new Schema({
  password: {
    type: String,
    required: [true, 'Password is required'],
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,
  },
  subscription: {
    type: String,
    enum: ['starter', 'pro', 'business'],
    default: 'starter',
  },
  verify: {
    type: Boolean,
    default: false,
  },
  verificationToken: {
    type: String,
    required: [true, 'Verify token is required'],
  },
  avatarURL: String,
  token: {
    type: String,
    default: null,
  },
});

userSchema.post('save', handleChangeError);

userSchema.post('findOneAndUpdate', handleChangeError);

const User = model('user', userSchema);

export default User;
