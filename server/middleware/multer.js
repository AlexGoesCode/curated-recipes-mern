import multer from 'multer';
import path from 'path';

const multerUpload = multer({
  storage: multer.diskStorage({}),
  fileFilter: (req, file, cb) => {
    // console.log('file :>> ', file);
    let extension = path.extname(file.originalname);
    if (extension !== '.jpg' && extension !== '.jpeg' && extension !== '.png') {
      cb(new Error('File extension not supported'), false);
      return;
    }
    cb(null, true);
  },
});

export { multerUpload };
