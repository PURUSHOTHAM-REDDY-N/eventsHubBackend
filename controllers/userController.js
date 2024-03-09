const pool = require("../db");
const User=require("../models/userModel")
const jwt= require("jsonwebtoken")
const quries = require("../queries/authQueries");
const { hashPassword,createToken } = require("../utils/helperFunctions");


//CREATING A JSON WEB TOKEN FOR USER AUTHENTICATION


const handleErrors=(err)=>{
    let errors = { username:"",email: "", password: "" };

  

  //login errors
  if (err.message === "incorrect email") {
    errors.email = "That email is not registered";
  }

  if (err.message === "incorrect password") {
    errors.password = "That password is incorrect";
  }

  //register errors
  if (err.message.includes("username")) {
    
    errors.username = "Username is already registered";
    return errors;
  }

  if (err.code === 11000) {
    errors.email = "Email is already registered";
    return errors;
  }

  if (err.message.includes("Users validation failed")) {
    Object.values(err.errors).forEach(({ properties }) => {
      errors[properties.path] = properties.message;
    });
  }

  return errors;
}


//REGISTER MODULE TO STORE DATA IN THE DATABASE

module.exports.register=async (req,res,next) => {
  

   try {

    const {username,email,password}=req.body;


    console.log(req.body)
    let hasedPassword = await hashPassword(password) 
    pool.query(quries.createUser,[username,email,hasedPassword],(error,results)=>{
      if (error) throw error;
      console.log(results.fields)
    })

    pool.query(quries.getUserIdByEmail,[email],(error,results)=>{
      if (error) throw error;
      const userId=results.rows[0].id
      const token=createToken(userId);
       console.log("now working")
        
        res.status(201).json({user:userId,created:true,jwt:token})
    })
        
        
    } catch (err) {
        console.log(err)
        const errors= handleErrors(err)
        res.json({errors,created:false})
    }
    
}


// CALLING  FUNCTION PRESENT IN THE USERMODEL FILE

module.exports.login=async (req,res,next)=>{
    
    
    try {
        const {email,password}=req.body;
        
        const user=await User.login(email,password)
        
        if(user){
            const token=createToken(user._id);
            
            res.json({jwt:token});

            // res.cookie("jwt",token,{
            //     withCredentials:true,
            //     httpOnly:false,
            //     maxAge:maxAge*1000});

                
                // res.json("successfully logged in")
            }
            res.send();
        next();
        
    } catch (error) {
        
        
        const errors= handleErrors(error)
        res.json({errors,created:false})
    }

}
