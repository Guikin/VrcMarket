const express = require('express');
const router = express.Router();
const s3Ctrl = require('../../controllers/s3-controller');
const Assets = require('../../models/assets');

require('dotenv').config()


const bucketName = process.env.AWS_BUCKET_NAME
const region = process.env.AWS_BUCKET_REGION
const accessKeyId = process.env.AWS_ACCESS_KEY
const secretAccessKey = process.env.AWS_SECRET_KEY


const S3 = require('aws-sdk/clients/s3')
const s3 = new S3({
  region,
  accessKeyId,
  secretAccessKey
})


const fs = require('fs')
const util = require('util')
const unlinkFile = util.promisify(fs.unlink)

const multer = require('multer')
const upload = multer({ dest: 'uploads/' })

const { uploadFile, getFileStream } = require('../../controllers/s3')

router.post('/upload-to-s3',s3Ctrl.s3Upload);

router.get('/all-files',s3Ctrl.s3Get); 

router.get('/get-object-url/:key',s3Ctrl.getSignedUrl)

router.get("/download/:filename", async (req, res) => {
  console.log("reached download")
  const filename = req.params.filename
  let x = await s3.getObject({ Bucket: bucketName, Key: filename }).promise();
  res.status(200).json(x.Body)
})

router.get('/images/:key', (req, res) => {
  console.log(req.params)
  const key = req.params.key
  const readStream = getFileStream(key)

  readStream.pipe(res)
})

router.post('/images', upload.single('image'), async (req, res) => {
  const file = req.file
  console.log(file)
  const user = req.user
  console.log("user is", user)


  // apply filter
  // resize 

  const result = await uploadFile(file)
  await unlinkFile(file.path)
  
  res.send(result.Key)
})

module.exports = router;