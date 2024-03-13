const bcrypt=require('bcrypt')
const jwt= require("jsonwebtoken")


const hashPassword = async (password)=>{
    const salt=await bcrypt.genSalt();
  return await bcrypt.hash(password,salt);
}


const maxAge=3*24*60*60;

const createToken = (user) => {
    return jwt.sign({user},process.env.SECRET_KEY,
    {expiresIn:maxAge},

    )
}

const verifyPassword = async (password,hashedPassword)=>{
    return await bcrypt.compare(password,hashedPassword)
}

module.exports = {hashPassword,createToken,verifyPassword}