const bcrypt=require('bcrypt')
const jwt= require("jsonwebtoken")


const hashPassword = async (password)=>{
    const salt=await bcrypt.genSalt();
  return await bcrypt.hash(password,salt);
}


const maxAge=3*24*60*60;

const createToken = (id) => {
    return jwt.sign({id},process.env.SECRET_KEY,
    {expiresIn:maxAge},

    )
}

module.exports = {hashPassword,createToken}