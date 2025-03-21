const mongoose = require('mongoose')
const menuSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    items:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:'MenuItem'
    }]
},{timestamps:true})

module.exports = mongoose.model('Menu',menuSchema)
