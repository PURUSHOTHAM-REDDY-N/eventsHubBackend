import express from 'express';
const {register, login}=require('../controllers/userController');
const { checkUser } = require('../Middilewares/AuthMiddlewares');

const router =express.Router();

// ROUTES

router.post("/auth",checkUser);

router.post('/auth/register',register)

router.post('/auth/login',login)

module.exports=router;

// PORT=503
// SECRET_KEY="purushotham reddy"
// URL="mongodb+srv://purushotham:purushotham@cluster0.9gpdgcz.mongodb.net/?retryWrites=true&w=majority"
