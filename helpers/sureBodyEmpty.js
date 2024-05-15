import HttpError from './HttpError.js';

const sureBodyEmpty = (req, _, next) => {
  if (Object.keys(req.body).length > 0) {
    throw HttpError(400, 'Body must not have any data');
  }
};

export default sureBodyEmpty;
