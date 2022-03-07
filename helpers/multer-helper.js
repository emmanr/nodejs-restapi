const multer = require('multer');

const fileStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'images'); // cb(error, "image path")
  },
  filename: (req, file, cb) => {
    cb(null, new Date().toISOString().replace(/[^a-zA-Z0-9]/g, "") + '_' + file.originalname)
  }
});

const fileFilter = (req, file, cb) => {
  if (file.mimetype === 'image/png' || file.mimetype === 'image/jpg' || file.mimetype === 'image/jpeg') {
    cb(null, true);
  } else {
    cb(null, false);
  }
}

const multerHelper = multer({storage: fileStorage, fileFilter: fileFilter}).single('image');
// single image - means extract a file stored in a field named image => <input name="image">

module.exports = multerHelper;
