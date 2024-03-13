const createUser = "INSERT INTO USERS (username,email,password) VALUES ($1,$2,$3) "
const getUserByEmail="SELECT id,username,email FROM USERS WHERE email = $1"
const getUserPasswordByEmail="SELECT password FROM USERS WHERE email = $1"


module.exports = {createUser,getUserByEmail,getUserPasswordByEmail}