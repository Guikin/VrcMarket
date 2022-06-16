const Assets = require('../../models/assets');
const formidable = require('formidable');

module.exports={
    create,
    edit,
    edit2,
    list,
    listMyAssets,
    displayAsset
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
    console.log(req.body)
    let getAsset= await Assets.findByIdAndUpdate(req.body.assetKey,{
        AWSkey:req.body.awsKey,
        Public:req.body.isPublic,
        codelock:req.body.codeLock,
        code:req.body.code,
        AWSEtag:req.body.awsEtag}
        )
     let check = await Assets.findById(req.body.assetKey)   
     console.log('check is', check)
     let passed = "passed"
     res.status(200).json(passed)
}

async function listMyAssets(req,res){
    console.log('reached my assets')
}

async function displayAsset(req,res){
    let getAsset= await Assets.findById(req.params.asset) 
    res.status(200).json(getAsset)
}

async function list(req,res){
    console.log(req.params.id)
    let getAsset= await Assets.findById(req.params.id)
    res.status(200).json(getAsset.name)
}