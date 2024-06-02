
const asyncHandler = require("express-async-handler");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken")
const User = require("../models/usermodel")

//@desc registred user
//@route POST/api/users/register
//@access public
const registration = asyncHandler(async (req,res)=>{
 const {username,email,password} = req.body;
 console.log(req.body);
 if(!username || !email ||!password){ 
    res.status(400);
    throw new Error("All fields are required")
 }

 const userAvailable = await User.findOne({email});

 if(userAvailable){
  res.status(400);
  throw new Error("User already exist");
 }


//Hash password
const hashedpassword = await bcrypt.hash(password,10);
console.log("hashed password : ",hashedpassword);

const user = await User.create({
  username,
  email,
  password:hashedpassword,
});

console.log(`user created ${user}`);

if(user){
  res.status(201)
.json({_id:user.id,email:user.email});
}else{
  res.status(400)
  throw new Error("user invalid")
}
});


//@desc login user
//@route POST/api/users/login
//@access public
// const loginUser = asyncHandler(async (req,res)=>{
//   const {email,password} = req.body;
//   if(!email || !password){
//     res.status(400);
//     throw new Error("All fields are required");
//   }
//   const user = await User.findOne({email});

//  //compare the password with hashedpassword
//   if(user && (await bcrypt.compare(password,user.password))){
//     const accessToken =jwt.sign({
//       user:{
//         username:user.username,
//         email:user.email,
//         id:user.id,
//       },
//     },
//     process.env.ACCESS_TOKEN_SECRET,
//     {expiresIn:"1D"}
//     );
//     res.json(200).json({accessToken});
//   }else{
//     res.status(401);
//     throw new Error("Invalid Email or Password");
//   }
//   res.json({message:"login the user"});

// });

const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
      res.status(400);
      throw new Error("All fields are required");
  }

  const user = await User.findOne({ email });

  // Compare the password with the hashed password
  if (user && (await bcrypt.compare(password, user.password))) {
      const accessToken = jwt.sign({
          user: {
              username: user.username,
              email: user.email,
              id: user.id,
          },
      },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: "1D" }
      );
      return res.status(200).json({ accessToken });
      // res.json({message:"user loggedin"});
  } else {
      res.status(401);
      throw new Error("Invalid Email or Password");
  }
});


//@desc current information of user
//@route GET/api/users/current
//@access private
const currentInfUser = asyncHandler(async (req,res)=>{
  res.json(req.user);
});

module.exports = {registration,loginUser,currentInfUser};