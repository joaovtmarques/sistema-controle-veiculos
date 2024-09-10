import fs from 'fs-extra';
import multer from 'multer';

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const path = `./tmp/uploads/${
      String(req.body.rank).replace(/\s/g, '') +
      '-' +
      String(req.body.warName).replace(/\s/g, '')
    }`;
    fs.mkdirsSync(path);

    cb(null, path);
  },
  filename: (req, file, cb) => {
    cb(
      null,
      String(req.body.rank).replace(/\s/g, '') +
        '-' +
        String(req.body.warName).replace(/\s/g, '') +
        '-' +
        String(file.originalname).replace(/\s/g, '')
    );
  },
});

export const uploadStorage = multer({ storage: storage });
