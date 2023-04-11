const express = require('express');
// const { getSignedUrl } = require('@aws-sdk/s3-request-presigner');
const { GetObjectCommand } = require('@aws-sdk/client-s3');
const circularJson = require('circular-json');
const { verify, addFile, getAllFiles } = require('../controllers/user');
const { upload } = require('../utils/multer');
const { verifyToken } = require('../middlewares/authentication');
const { s3 } = require('../utils/awsBucket');
const fs = require("fs");
const path = require("path");
//const { s3, getObject } = require('../utils/awsBucket');

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

router.get('/download-file/:key', verifyToken, async (req, res) => {
  const { key } = req.params;
  try {
    // const command = new GetObjectCommand({
    //   Bucket: process.env.AWS_S3_BUCKET_NAME,
    //   Key: key,
    //   ResponseContentType: mimetype,
    // });
    // const url = await getSignedUrl(client, command, { expiresIn: 600 });
    // console.log(url, ' dont look');
    // streaming file//
    const params = {
      Bucket: process.env.AWS_S3_BUCKET_NAME,
      Key: key,
    };
    // const s3Stream = getObject(s3, params).createReadStream();
    // res.setHeader('Content-Type', 'application/octet-stream');
    // res.setHeader('Content-Disposition', `attachment; filename=${key}`);
    // s3Stream.pipe(res);
    const command = new GetObjectCommand(params);
    const { Body } = await s3.send(command);
    // const json = circularJson.stringify(Body);
    // console.log(json, "opopo");
    // res.send(json);
    // res.status(200).json({ message: 'success', data: url });
    // res.setHeader("Content-Type", "application/json");
    // res.setHeader("Content-Disposition", `attachment; filename=${key}`);
    res.setHeader(
      "Content-Disposition",
      `attachment; filename=${path.basename(key)}`
    );
    res.setHeader("Content-Type", "image/png");
    // Send the S3 object content as the response
    const json = circularJson.stringify(Body);
    res.send(json);
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: error });
  }
});
module.exports = router;
