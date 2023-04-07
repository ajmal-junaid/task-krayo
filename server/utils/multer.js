const multer = require('multer');
const multerS3 = require('multer-s3');
const s3 = require('./awsBucket');

const storage = multerS3({
  s3,
  bucket: process.env.AWS_S3_BUCKET_NAME,
  contentType: multerS3.AUTO_CONTENT_TYPE,
  key(req, file, cb) {
    const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
    const extension = file.mimetype.split('/')[1];
    const fileName = `${file.fieldname}-${uniqueSuffix}.${extension}`;
    console.log(fileName);
    cb(null, fileName);
  },
});

module.exports = {
  upload: multer({
    storage,
  }),
};
