import HttpError from './HttpError.js';

export const responseWrapper = (respData, errorStatus, res, resStatus) => {
  if (!respData) {
    throw HttpError(errorStatus);
  }
  res.status(resStatus).json({
    status: 'success',
    code: resStatus,
    data: { ...respData },
  });
};
