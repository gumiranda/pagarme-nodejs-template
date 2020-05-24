"user strict";

const mongoose = require("mongoose");
const schema = mongoose.Schema;
const {ObjectId} = mongoose.Schema;
const moment = require('moment');
const userModel = new schema({
  nome:{trim:true,index:true,required:true,type:String},
  email:{type:String},
  senha:{type:String},
  ativo:{type:Boolean,required:true,default:true},
  payDay:{ type:Date,default:Date.now },
  createdAt:{type:Date,default:Date.now}
},{versionKey:false});

userModel.pre("save",next=>{
  let agora = new Date();
  const datav = new Date(moment().add(7,'days')._d.toISOString());
  if(!this.createdAt) this.createdAt = agora;
  if(!this.payDay) this.payDay = datav;
  next();
});

module.exports = mongoose.model("User",userModel);