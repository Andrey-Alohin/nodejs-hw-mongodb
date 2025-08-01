import multer from 'multer';
import { TEMP_UPLOAD_DIR } from '../constants/index.js';

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, TEMP_UPLOAD_DIR);
  },
  filename: function (req, file, cb) {
    const formatedName = file.originalname
      .toLowerCase()
      .replace(/\s/g, '_')
      .replace(/[^\w.-]/g, '');
    const uniqueSuffix = Date.now() + '_' + Math.round(Math.random() * 1e9);
    cb(null, `${uniqueSuffix}_${formatedName}`);
  },
});

export const upload = multer({ storage });
