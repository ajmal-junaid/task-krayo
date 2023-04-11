const express = require('express');
const {
  verify, addFile, getAllFiles, checkAuth,
} = require('../controllers/user');
const { upload } = require('../utils/multer');
const { verifyToken } = require('../middlewares/authentication');
const { s3, GetObjectCommand } = require('../utils/awsBucket');

const router = express.Router();

router.post('/signin', async (req, res) => {
  try {
    const { credential, clientId } = req.body;
    const result = await verify(credential, clientId).catch(console.error);
    res.status(200).json({ message: 'success', data: result });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error });
  }
});

router.post('/upload-file', verifyToken, upload.single('file'), async (req, res) => {
  try {
    const {
      originalname, mimetype, size, key,
    } = req.file;
    const user = req.token;
    if (!user) return res.status(403).json({ message: 'Login to continue' });
    const result = await addFile({
      originalname, mimetype, size, key, user,
    });
    return res.status(200).json({ message: 'file uploaded', data: result });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: 'error in file upload' });
  }
});

router.get('/my-files', verifyToken, async (req, res) => {
  try {
    const result = await getAllFiles(req.token);
    res.status(200).json({ message: 'success', data: result });
  } catch (error) {
    res.status(500).json({ message: error });
  }
});
function getContentType(key) {
  const ext = key.split('.').pop();
  switch (ext) {
    case 'pdf':
      return 'application/pdf';
    case 'doc':
      return 'application/msword';
    case 'docx':
      return 'application/vnd.openxmlformats-officedocument.wordprocessingml.document';
    case 'xls':
      return 'application/vnd.ms-excel';
    case 'xlsx':
      return 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet';
    case 'ppt':
      return 'application/vnd.ms-powerpoint';
    case 'pptx':
      return 'application/vnd.openxmlformats-officedocument.presentationml.presentation';
    case 'png':
      return 'image/png';
    case 'jpg':
    case 'jpeg':
      return 'image/jpeg';
    case 'gif':
      return 'image/gif';
    default:
      return 'application/octet-stream';
  }
}
router.get('/download-file/:key', verifyToken, async (req, res) => {
  const { key } = req.params;
  const user = req.token;
  try {
    if (!user) return res.status(403).json({ message: 'Login to continue' });
    const result = await checkAuth(user, key);
    if (!result) return res.status(401).json({ message: 'Unauthorized' });
    const params = {
      Bucket: process.env.AWS_S3_BUCKET_NAME,
      Key: key,
    };
    const command = new GetObjectCommand(params);
    const { Body } = await s3.send(command);
    const contentType = getContentType(key);
    res.setHeader('Content-Type', contentType);
    Body.pipe(res);
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: error });
  }
});
module.exports = router;
