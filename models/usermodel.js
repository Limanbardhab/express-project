const express = require('express');
const mongoose =require('mongoose')

const userSchema = mongoose.Schema({
  username:{
    type:String,
    required:[true,"Please add the name of user"]
  },
  email:{
    type:String,
    required:[true,"please add user email id"],
    unique :[true,"Email  is already exist"]
  },
  password:{
    type:String,
    required:[true,"please add user Password"]
  }
},
{
  timestamps:true,
}
)

module.exports = mongoose.model("user",userSchema);