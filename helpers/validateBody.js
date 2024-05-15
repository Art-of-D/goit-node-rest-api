import HttpError from './HttpError.js';

const validateBody = schema => {
  const func = async (req, _, next) => {
    const { error } = await schema.validate(req.body);
    if (error) {
      throw HttpError(400, error.message);
    }
  };
  return func;
};

export default validateBody;
