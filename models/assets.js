const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Assets = new Schema({
    name: {type: String, required: true},
    Pictures : [{type:String}],
    Downloads : {type:Number},
    Rating: {type:Number},
    date:{type:Date,
    dateAdded:new Date()},
    tags:[{type:String}]
})

module.exports = mongoose.model('Assets', AssetSchema);