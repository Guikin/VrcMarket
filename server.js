const express = require('express');
const path = require('path');
const favicon = require('serve-favicon');
const logger = require('morgan');

const s3Controller = require('./s3-controller')


require('dotenv').config()
require('./config/database.js')

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

const { uploadFile, getFileStream } = require('./s3')





const app = express();

app.use(logger('dev'));
app.use(express.json());

app.post('/upload-to-s3',s3Controller.s3Upload);

app.get('/all-files',s3Controller.s3Get); 

app.get('/get-object-url/:key',s3Controller.getSignedUrl)

app.get("/download/:filename", async (req, res) => {
  console.log("reached download")
  const filename = req.params.filename
  let x = await s3.getObject({ Bucket: bucketName, Key: filename }).promise();
  res.status(200).json(x.Body)
})

app.get('/images/:key', (req, res) => {
  console.log(req.params)
  const key = req.params.key
  const readStream = getFileStream(key)

  readStream.pipe(res)
})

app.post('/images', upload.single('image'), async (req, res) => {
  const file = req.file
  console.log(file)

  // apply filter
  // resize 

  const result = await uploadFile(file)
  await unlinkFile(file.path)
  console.log(result)
  const description = req.body.description
  res.send({imagePath: `/images/${result.Key}`})
})



// Configure both serve-favicon & static middlewares
// to serve from the production 'build' folder
app.use(favicon(path.join(__dirname, 'build', 'favicon.ico')));
app.use(express.static(path.join(__dirname, 'build')));

// Put API routes here, before the "catch all" route

app.use(require('./config/auth'));

app.use('/api/users', require('./routes/api/users'))
// app.use('/api/orders', require('./routes/api/orders.js'));
// this one is going to do double duty, serving both items and categories-related routes:
// app.use('/api', require('./routes/api/items.js'));


// The following "catch all" route (note the *)is necessary
// for a SPA's client-side routing to properly work
app.get('/*', function(req, res) {
    res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

// Configure to use port 3001 instead of 3000 during
// development to avoid collision with React's dev server
const port = process.env.PORT || 3001;

app.listen(port, function() {
  console.log(`Express app running on port ${port}`)
});