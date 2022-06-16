const Assets = require('../../models/assets');
const formidable = require('formidable');

module.exports={
    create,
    edit,
    edit2,
    list
}

async function create(req,res){
    // const formData = await readFormData(req)
    let newAsset = await Assets.create({name:req.body.name,user:req.body.user})
    let findAll = await Assets.find({})
    res.status(200).json(newAsset.id)
}

async function edit(req,res){

    if(!req.body.name){
    req.body.name = req.body.assetName
    }
    let getAsset= await Assets.findByIdAndUpdate(req.body.asset,{
        Pictures:req.body.images,
        tags:req.body.categories,
        name:req.body.name,
        description:req.body.description

    })
    console.log(getAsset)
    let passed = "passed"
    res.status(200).json(passed)
}

async function edit2(req,res){
    console.log('reached edit2')
    console.log(req.body)
}

async function list(req,res){
    console.log(req.params.id)
    let getAsset= await Assets.findById(req.params.id)
    res.status(200).json(getAsset.name)
}