import HttpError from './HttpError.js';
export const isEmpty = (req, res, next) => {
  if (Object.keys(req.body).length === 0) {
    throw HttpError(400, 'Body must have at least one field');
  }
  next();
};
