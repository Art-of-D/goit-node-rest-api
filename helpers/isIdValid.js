import { isValidObjectId } from 'mongoose';
import HttpError from './HttpError.js';

const isIdValid = (req, _, next) => {
  const { id } = req.params;
  if (!isValidObjectId(id)) {
    return next(HttpError(400, `${id} is not a valid id`));
  }
  next();
};

export default isIdValid;
