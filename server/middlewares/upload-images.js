const multer = require('multer');

const storageCover = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, 'uploads/');
  },
  filename(req, file, cb) {
    cb(null, new Date().toISOString().replace(/:/g, '-') + '-' + file.originalname);
  }
});

const fileFilter = (req, file, cb) => {
  // reject a file
  if (
    file.mimetype === 'image/jpeg' ||
    file.mimetype === 'image/png' ||
    file.mimetype === 'image/jpg'
  ) {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

const uploadCover = multer({
  storageCover,
  limits: {
    //  file size max 2mb
    fileSize: 1024 * 1024 * 2
  },
  fileFilter
});

module.exports = uploadCover;
