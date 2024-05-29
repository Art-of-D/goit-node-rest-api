import HttpError from '../helpers/HttpError.js';

export const responseWrapper = (respData, errorStatus, res, resStatus) => {
  console.log(respData);
  if (!respData) {
    throw HttpError(errorStatus);
  }
  res.status(resStatus).json(respData);
};
