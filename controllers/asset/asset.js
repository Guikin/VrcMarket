const Assets = require('../../models/assets');
const formidable = require('formidable');
const User =require("../../models/user")

module.exports={
    create,
    edit,
    edit2,
    list,
    listMyAssets,
    displayAsset,
    listAllAssets,
    getAuthor,
    deleteMyAssets,
    getAssetByDate
}

async function getAuthor(req,res){
    let author = await User.findById(req.body.authorId)
    res.status(200).json(author)
}

async function create(req,res){
    // const formData = await readFormData(req)
    let newAsset = await Assets.create({name:req.body.name,user:req.body.user,AuthorName:req.body.author})
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
async function listAllAssets(req,res){
    if(!req.body.search){
        req.body.search=''
    }
    let assets=[]
    if(/\S/.test(req.body.search)){
        assets = await Assets.find({ name: { $regex: req.body.search, $options: "i" }})
    }else{assets = await Assets.find({})
} 
res.status(200).json(assets)
}

async function listMyAssets(req,res){
    let getAsset = await Assets.find({user:req.body.user})
    res.status(200),res.json(getAsset)
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

async function deleteMyAssets(req,res){
    console.log(req.body.assetKey)
    let getAsset = await Assets.findByIdAndDelete(req.body.assetKey)
    console.log(getAsset)
}


async function getAssetByDate(req,res){
    let getAsset = await Assets.find({}).sort({ dateCreated: -1 }).limit(10)
    res.status(200).json(getAsset)
}

{/* <iframe src='https://my.spline.design/girlgumbubblecopy-8402ff9b123d042e34139e05fd706761/' frameborder='0' width='100%' height='100%'></iframe> */}