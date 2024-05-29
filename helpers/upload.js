import multer from 'multer';
import HttpError from './HttpError.js';
import path from 'path';

const destination = path.resolve('tmp');

const storage = multer.diskStorage({
  destination,
  filename: function (req, file, cb) {
    cb(null, `${Date.now()}_${file.originalname}`.replace(/\s/g, '_'));
  },
});

const fileFilter = (req, file, cb) => {
  if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
    cb(null, true);
  } else {
    return cb(HttpError(400, 'Invalid file type, only JPEG and PNG'));
  }
};

const limits = {
  fileSize: 1024 * 1024 * 5,
};

const upload = multer({ storage, fileFilter, limits });

export default upload;
