import HttpError from './HttpError.js';

const checkFavorite = (req, _, next) => {
  const { favorite } = req.params;
  const isValid = ['true', 'false'].includes(favorite);
  if (!isValid) {
    return next(HttpError(400, `${favorite} is not a valid type`));
  }
  next();
};

export default checkFavorite;
