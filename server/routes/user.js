const express = require('express');
const { verify } = require('../controllers/authentication');
const { upload } = require('../utils/multer');

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

router.post('/upload-file', upload.single('file'), (req, res) => {
  console.log( req.file);
  res.status(200).json({ message: 'okkkk' });
});
module.exports = router;
