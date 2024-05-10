export const isEmpty = (req, res, next) => {
  if (Object.keys(req.body).length === 0) {
    res.status(400).json({
      status: 'error',
      code: 400,
      message: 'Body must have at least one field"',
    });
  }
  next();
};
