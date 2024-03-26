import { Router, Request , Response , NextFunction } from "express";
import { createUser, getCurrentUser, login } from "../services/auth.service";
import auth from "../Middilewares/auth.middleware";

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
        }
        else{
            throw new Error('User not found');
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




export default router