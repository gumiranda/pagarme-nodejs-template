"user strict";

const mongoose = require("mongoose");
const schema = mongoose.Schema;
const {ObjectId} = mongoose.Schema;

const userModel = new schema({
  nome:{trim:true,index:true,required:true,type:String},
  email:{type:String},
  senha:{type:String},
  ativo:{type:Boolean,required:true,default:true},
  createdAt:{type:Date,default:Date.now}
},{versionKey:false});

userModel.pre("save",next=>{
  let agora = new Date();
  if(!this.createdAt) this.createdAt = agora;
  next();
});

module.exports = mongoose.model("User",userModel);