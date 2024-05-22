import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import 'dotenv/config';

const { SECRET_WORD } = process.env;

export const passwordCompare = (pass, userPass) =>
  bcrypt.compare(pass, userPass);

export const hashPassword = async pass => await bcrypt.hash(pass, 10);

export const tokenGenerate = payload =>
  jwt.sign(payload, SECRET_WORD, { expiresIn: '1h' });

export const verifyToken = token => jwt.verify(token, SECRET_WORD);
