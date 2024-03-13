const User = require("../models/userModel");
const jwt = require("jsonwebtoken");
const pool = require("../db");
const quries = require("../queries/authQueries");

module.exports.checkUser = (req, res, next) => {
  const token = req.cookies.jwt;
  if (token) {
    jwt.verify(token, process.env.SECRET_KEY, async (err, decodedToken) => {
      if (err) {
        res.json({ status: false });
        next();
      } else {
        
        pool.query(quries.getUserByEmail, [decodedToken.user.email], async (error, results) => {
          if (error) throw error;
          const user = results.rows[0];
          if (user) {
            res.json({ status: true, user: user.username });
          } else {
            res.json({ status: false });
            
          }
        });
        
        
        next();
      }
    });
  } else {
    
    res.json({ status: false });
    next();
  }
};
