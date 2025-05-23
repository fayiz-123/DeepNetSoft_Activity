const mongoose = require('mongoose')
const menuItemSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    price:{
        type:Number,
        required:true
    },
    menu:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Menu',
        required:true
    }
},{timestamps:true})

module.exports = mongoose.model('MenuItem',menuItemSchema)
