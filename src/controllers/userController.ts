const pool = require("../../db");
const User = require("../models/userModel");
const jwt = require("jsonwebtoken");
const quries = require("../queries/authQueries");
const {
  hashPassword,
  createToken,
  verifyPassword,
} = require("../utils/helperFunctions");



//REGISTER MODULE TO STORE DATA IN THE DATABASE

module.exports.register = async (req:any, res:any, next:any) => {
  try {
    const { username, email, password } = req.body;
    console.log(req.body);
    let hasedPassword = await hashPassword(password);
    if(hasedPassword){
      // pool.query(
      //   quries.createUser,
      //   [username, email, hasedPassword],
      //   (error, results) => {
      //     if (error) throw error;
      //     res.status(201).json("successfully registered");
      //   }
      // );
    }
    else{
      res.json({errors:"password hashing failed", created:false})     }
    
  } catch (err) {
    console.log(err);
    // res.json({ errors, created: false });
  }
};

// CALLING  FUNCTION PRESENT IN THE USERMODEL FILE

module.exports.login = async (req:any, res:any, next:any) => {
  try {
    const { email, password } = req.body;
    console.log(req.body);

    // const user=await User.login(email,password)
    let isValidPassword = false;
    // pool.query(
    //   quries.getUserPasswordByEmail,
    //   [email],
    //   async (error, results) => {
    //     if (error) throw error;
    //     if(results.rows.length===0) return res.json({errors:"incorrect password",created:false})
    //     const hashedPassword = results.rows[0].password;
    //     isValidPassword = await verifyPassword(password, hashedPassword);
    //     console.log("is valid password here ",isValidPassword);
    //     if (isValidPassword) {
    //       pool.query(quries.getUserByEmail, [email], async (error, results) => {
    //         if (error) throw error;
    //         const user = results.rows[0];
    //         const token = createToken(user);
    //         res.status(201).json({ user: user, authToken: token });
    //       });
    //     }
    //     else{
    //       res.json({errors:"incorrect password",created:false})
    //     }
    //   }
    // );
    
  } catch (error) {
    // const errors = handleErrors(error);
    // res.json({ errors, created: false });
  }
};
