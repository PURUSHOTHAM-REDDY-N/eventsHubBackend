const pool = require("../db");
const User = require("../models/userModel");
const jwt = require("jsonwebtoken");
const quries = require("../queries/authQueries");
const {
  hashPassword,
  createToken,
  verifyPassword,
} = require("../utils/helperFunctions");

//CREATING A JSON WEB TOKEN FOR USER AUTHENTICATION

const handleErrors = (err) => {
  let errors = { username: "", email: "", password: "" };

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
};

//REGISTER MODULE TO STORE DATA IN THE DATABASE

module.exports.register = async (req, res, next) => {
  try {
    const { username, email, password } = req.body;
    console.log(req.body);
    let hasedPassword = await hashPassword(password);
    if(hasedPassword){
      pool.query(
        quries.createUser,
        [username, email, hasedPassword],
        (error, results) => {
          if (error) throw error;
          res.status(201).json("successfully registered");
        }
      );
    }
    else{
      res.json({errors:"password hashing failed", created:false})     }
    
  } catch (err) {
    console.log(err);
    const errors = handleErrors(err);
    res.json({ errors, created: false });
  }
};

// CALLING  FUNCTION PRESENT IN THE USERMODEL FILE

module.exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    console.log(req.body);

    // const user=await User.login(email,password)
    let isValidPassword = false;
    pool.query(
      quries.getUserPasswordByEmail,
      [email],
      async (error, results) => {
        if (error) throw error;
        if(results.rows.length===0) return res.json({errors:"incorrect password",created:false})
        const hashedPassword = results.rows[0].password;
        isValidPassword = await verifyPassword(password, hashedPassword);
        console.log("is valid password here ",isValidPassword);
        if (isValidPassword) {
          pool.query(quries.getUserByEmail, [email], async (error, results) => {
            if (error) throw error;
            const user = results.rows[0];
            const token = createToken(user);
            res.status(201).json({ user: user, authToken: token });
          });
        }
        else{
          res.json({errors:"incorrect password",created:false})
        }
      }
    );
    
  } catch (error) {
    const errors = handleErrors(error);
    res.json({ errors, created: false });
  }
};
