const asyncHandler = require("express-async-handler");
const Contact = require("../models/contactmodel");


//@desc Get all contacts
//@route /GET/api/contacts
//@access public
const getContacts = asyncHandler(async(req,res) =>{
  const contacts = await Contact.find({user_id:req.user.id});
  res.status(200).json(contacts);
});


//@desc create  all new contacts
//@route /CREATE/api/contacts
//@access public
const createContact = asyncHandler(async(req,res) => {
  console.log("the request body is :",req.body);
  const { name, email, phone} = req.body;
  if( !name || !email || !phone ){
    res.status(400);
    throw new Error("All Fields are mandatory !");
  }

  const contact = await Contact.create({
    name,
    email,
    phone,
    user_id:req.user.id
  });

  res.status(201).json(contact);
});

//@desc Get all contacts
//@route /GET/api/contacts/:id
//@access public
const getContact = asyncHandler(async(req,res) =>{
  const contact = await Contact.findById(req.params.id);
  if(!contact){
    res.status(404);
    throw new Error("Contact not Found")
  }
  res.status(200).json(contacts);
});



//@desc update all contacts
//@route /UPDATE/api/contacts
//@access public
const updateContact = asyncHandler(async(req,res) => {
  const contact = await Contact.findById(req.params.id);
  if(!contact){
    res.status(404);
    throw new Error("Contact not Found")
  }
  
  if(contact.user_id.toString() !== req.user.id){
    res.status(403);
    throw new Error("User donot have permission to update other user contacts..")
  }

  const Updatedcontact = await Contact.findByIdAndUpdate(
    req.params.id,
    req.body,
    {new:true}
  );
  res.status(200).json(Updatedcontact); 
});


//@desc Delete all contacts
//@route /DELETE/api/contacts
//@access public
const deleteContact =asyncHandler( async(req,res) => {
  const contact = await Contact.findById(req.params.id);
  if(!contact){
    res.status(400);
    throw new Error("contact not found");
  }
   await Contact.deleteOne({_id:req.params.id});
   res.status(200).json(contact);

  res.json({message:`delete contact for ${req.params.id}`});
});

module.exports = {getContacts,getContact,createContact,updateContact,deleteContact};
