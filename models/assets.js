const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const AssetSchema = new Schema({
    name: {type: String, required: true},
    Pictures : [{type:String}],
    Downloads : {type:Number,default :0},
    Rating: {type:Number,default :0},
    date:{type:Date,dateAdded:new Date()},
    tags:[{type:String}],
    Public: {type:Boolean,default: false },
    AWSkey:{type:String},
    user:{type:String,required:true},
    code:{type:String},
    codelock:{type:Boolean,default:false},
    description:{type:String,default:''},
    AWSEtag:{type:String},
    AuthorName:{type:String}
})

module.exports = mongoose.model('Assets', AssetSchema);
