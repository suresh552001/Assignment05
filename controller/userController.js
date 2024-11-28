const User=require("../models/userModel");
const asyncHandler=require("express-async-handler");
const bcrypt=require("bcryptjs");
const jwt=require("jsonwebtoken");
const registerUser=asyncHandler(async(req,res)=>{
require("dotenv").config();

    const{name,email,password}= await req.body;
    if(!name||!email||!password){
        res.status(400);
        throw new Error("please fill the field");
    }

    // user already exist

    const userExists=await User.findOne({email:email});
    if(userExists){
        res.status(400);
        throw new Error("User already exists ");
    }

    //hash password
     console.log(process.env.SALT);
     const secret=parseInt(process.env.SALT);
    const salt=await bcrypt.genSalt(secret);
    console.log(salt);
   const hashedpassword=await bcrypt.hash(password,salt)
   const user=await User.create({
    name:name,
    email:email,
    password:hashedpassword,

   })
      if(user){
        res.status(201).json({
           _id:user._id,
           name:user.name,
           email:user.email,
        })
      }else{
        res.status(401);
        throw new Error("Inavalid User data");
      }

})

    const loginUser=asyncHandler(async(req,res)=>{
      const{email,password}=req.body;
      const user=await User.findOne({email});
      console.log(user);
          if(user&&(await bcrypt.compare(password,user.password)))
        {
          res.status(200).json({
            _id:user._id,
          name:user.name,
          email:user.email,
          token:generateToken(user._id)
          })
        }else{
          res.status(400);
          throw new Error("Invalid password and username");
        }        
    })  
        
     const generateToken=(id)=>{
      var token=jwt.sign({id},process.env.SECRET_KEY,{expiresIn:"30d"});
      console.log(token);
      return token;
     }
module.exports={registerUser,loginUser};
