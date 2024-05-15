import HttpError from './HttpError.js';

export const responseWrapper = (respData, errorStatus, res, resStatus) => {
  if (!respData) {
    throw HttpError(errorStatus);
  }
  const data = Array.isArray(respData) ? respData : { ...respData };
  res.status(resStatus).json(data);
};
