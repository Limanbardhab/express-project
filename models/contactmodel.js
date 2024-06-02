const mongoose = require("mongoose");

const contactSchema = mongoose.Schema({
  user_id:{
    type:mongoose.Schema.Types.ObjectId,
    require:true,
    ref:"user"
  },
  name: {
    type: String ,
    required:[true ,"Please add contact name !"],
  },
  email: {
    type : String,
    required: [true ,"Please add the contact email address"],
  },
  phone : {
    type: String,
    required: [true,"please add the contact Number"]
  },
  },
  {
    timestamps : true ,
  },

);

module.exports = mongoose.model("Contact",contactSchema);