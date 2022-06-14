require('dotenv').config()
const fs = require('fs')
const S3 = require('aws-sdk/clients/s3')

const bucketName = process.env.AWS_BUCKET_NAME
const region = process.env.AWS_BUCKET_REGION
const accessKeyId = process.env.AWS_ACCESS_KEY
const secretAccessKey = process.env.AWS_SECRET_KEY

const adminKey=process.env.AWS_ADMIN_KEY
const adminSecret=process.env.AWS_ADMIN_SECRET
const adminBucket = process.env.AWS_ADMIN_BUCKET

function createS3Instance(){
    const s3 = new S3({
        credentials:{
            accessKeyId:adminKey,
            secretAccessKey:adminSecret
        },
        region:'us-west-1'
    })
    return s3
}

async function uploadFiletos3(fileObj,bucketName){
  const s3= createS3Instance();
  const fileStream = fs.createReadStream(fileObj.filepath);
  const params={
    Body:fileStream,
    Bucket:bucketName,
    Key:fileObj.originalFilename
 }
   const uploadData = await s3.upload(params).promise()
   console.log(uploadData)
   return uploadData
}

module.exports = {
    uploadFiletos3
}

console.log(adminSecret)