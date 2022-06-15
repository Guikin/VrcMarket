const formidable = require('formidable');
const { createHashHistory } = require('history');
const {uploadFiletos3, getBucketListFromS3,getPresignedURL} = require('../s3-services')

async function s3Upload (req,res){
    const formData = await readFormData(req);
    console.log("formData is",formData)
    try{
        await uploadFiletos3(formData.file,'vrcmarketassets')
        res.send('Uploaded!!')
    }catch(ex){
        console.log(ex)
        res.send("error")
    }
} 

async function s3Get(req,res){
    
    try{
    const bucketData = await getBucketListFromS3('vrcmarketassets')
    const {Contents = []} = bucketData;
    
    res.send((Contents.map(content =>{
        return{
            key:content.Key,
            size:(content.Size/1024).toFixed(1)+'KB',
            lastModified:content.LastModified,
            eTag:content.ETag
        }})));
    }catch(ex){
        console.log("error",ex)
        res.send(([]))
    }
}

async function readFormData(req){
    return new Promise(resolve => {
        let dataObj = {};
        let form = new formidable.IncomingForm();
        form.parse(req);

        form.on('file',(name,file)=>{
            dataObj.name = name;
            dataObj.file = file
        })
        form.on('end',()=>{
            resolve(dataObj)
        })
    })
}

async function getSignedUrl(req,res){
    try{
        const {key} = req.params
        console.log(key)
        const url = await getPresignedURL('vrcmarketassets',key)
        console.log("url",url)
        res.send(url)

    }catch(ex){
        console.log('error',ex)
        res.send('error')
    }
}

module.exports = {
    s3Upload,
    s3Get,
    getSignedUrl
}