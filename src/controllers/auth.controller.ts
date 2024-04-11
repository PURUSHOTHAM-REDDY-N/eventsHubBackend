import { Router, Request , Response , NextFunction } from "express";
import { createUser, editUserProfile, getAccountDetailsByAccountId, getCurrentUser, login } from "../services/auth.service";
import auth from "../Middilewares/auth.middleware";
import HttpException from "../utils/http-exception";
import { error } from "console";


const router = Router();

router.post("/auth/register",async (req:Request,res:Response,next:NextFunction) => {
    try {
        const user = await createUser(req.body)
        res.json({user})
    } catch (error) {
        next(error)
    }
})

router.post("/auth/login",async (req:Request,res:Response,next:NextFunction) => {
    try {
        const user = await login(req.body)
        if(user){
            res.json({user})
        }else{
            res.status(404).send('user Not found');
        }
    } catch (error) {
        next(error)
    }
})

router.post("/auth/getCurrentUser",auth,async (req:Request,res:Response,next:NextFunction) => {
    try {
        const user = await getCurrentUser(req.user?.username as string)
        res.json({user})
    } catch (error) {
        next(error)
    }
})

router.get("/auth/getAccountDetailsByAccountId",auth, async (req:Request,res:Response,next:NextFunction)=>{
    try {
        const user = await getAccountDetailsByAccountId(req.body.user.id as string)
        res.json({user})
    } catch (error) {
        next(error)
    }
})

router.post('/auth/editUserProfile',auth,async (req:Request,res:Response,next:NextFunction)=>{
    console.log("hello",req.body.user.id)
    try {
        const user = await editUserProfile(req.body,req.body.user.id)
        res.json({user})
    } catch (error) {
        next(error)
    }
})




export default router