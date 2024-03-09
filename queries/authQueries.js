const createUser = "INSERT INTO USERS (username,email,password) VALUES ($1,$2,$3) "
const getUserIdByEmail="SELECT id FROM USERS WHERE email = $1"

module.exports = {createUser,getUserIdByEmail}