const express = require('express');
const { getSignedUrl } = require('@aws-sdk/s3-request-presigner');
const { GetObjectCommand } = require('@aws-sdk/client-s3');
const { verify, addFile, getAllFiles } = require('../controllers/user');
const { upload } = require('../utils/multer');
const { verifyToken } = require('../middlewares/authentication');
const client = require('../utils/awsBucket');

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

router.post('/download-file', verifyToken, async (req, res) => {
  try {
    const { key, mimetype } = req.body;
    console.log(key);
    const command = new GetObjectCommand({
      Bucket: process.env.AWS_S3_BUCKET_NAME,
      Key: key,
      ResponseContentType: mimetype,
    });
    const url = await getSignedUrl(client, command, { expiresIn: 600 });
    res.status(200).json({ message: 'success', data: url });
  } catch (error) {
    res.status(500).json({ message: error });
  }
});
module.exports = router;
