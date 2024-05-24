const mongoose = require('mongoose');
const { Schema } = mongoose;

const UserSchema = new Schema({
    username:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    },
    phNumber:{
        type:Number,
        required:true
    },
    date:{
        type:Date,
        default:Date.now
    },
    profession:{
        type:String,
        required:true
    },
  });
  
  module.exports=mongoose.model('User',UserSchema)