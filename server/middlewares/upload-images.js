const multer = require('multer');
const uuidv4 = require('uuid/v4');

const storageAvatars = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, './uploads/avatars');
  },
  filename(req, file, cb) {
    fileName = file.originalname
      .toLowerCase()
      .split(' ')
      .join('-');
    cb(null, uuidv4() + '-' + fileName);
  }
});
const storageCover = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, './uploads/covers');
  },
  filename(req, file, cb) {
    fileName = file.originalname
      .toLowerCase()
      .split(' ')
      .join('-');
    cb(null, uuidv4() + '-' + fileName);
  }
});

const fileFilter = (req, file, cb) => {
  if (
    file.mimetype == 'image/png' ||
    file.mimetype == 'image/jpg' ||
    file.mimetype == 'image/jpeg'
  ) {
    cb(null, true);
  } else {
    cb(null, false);
    return cb(new Error('Only .png, .jpg and .jpeg format allowed!'));
  }
};

const uploadCover = multer({
  storage: storageCover,
  limits: {
    //  file size max 2mb
    fileSize: 1024 * 1024 * 2
  },
  fileFilter
});

const uploadAvatar = multer({
  storage: storageAvatars,
  limits: {
    // file size max 2mb
    fileSize: 1024 * 1024 * 2
  },
  fileFilter
});

module.exports = { uploadCover, uploadAvatar };
