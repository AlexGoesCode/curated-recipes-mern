import multer from 'multer';
import path from 'path';

const multerUpload = multer({
  //* multer() is a function that returns an object with the following properties: storage, fileFilter
  storage: multer.diskStorage({}), //* storage is an object with a diskStorage method that takes an object with destination and filename properties
  fileFilter: (req, file, cb) => {
    //* fileFilter is a function that takes the request, the file and a callback function which takes an error and a boolean
    // console.log('file :>> ', file);
    let extension = path.extname(file.originalname); //* get the extension of the file
    if (extension !== '.jpg' && extension !== '.jpeg' && extension !== '.png') {
      cb(new Error('File extension not supported'), false);
      return;
    }
    cb(null, true);
  },
});

export { multerUpload };
