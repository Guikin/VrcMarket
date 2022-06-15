const Assets = require('../../models/assets');
const formidable = require('formidable');

module.exports={
    create,
    edit,
    list
}

async function create(req,res){
    // const formData = await readFormData(req)
    let newAsset = await Assets.create({name:req.body.name,user:req.body.id})
    let findAll = await Assets.find({})
    res.status(200).json(newAsset.id)
}

async function edit(req,res){

}

async function list(req,res){
    console.log(req.params.id)
    let getAsset= await Assets.findById(req.params.id)
    res.status(200).json(getAsset.name)
}