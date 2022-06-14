const formidable = require('formidable');
const {uploadFiletos3} = require('./assets')

async function s3Upload (req,res){
    const formData = await readFormData(req);
    try{
        await uploadFiletos3(formData.file,'vrcmarketassets')
        res.send('Uploaded!!')
    }catch(ex){
        console.log(ex)
        res.send("error")
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

module.exports = {
    s3Upload
}