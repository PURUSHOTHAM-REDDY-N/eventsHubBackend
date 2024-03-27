import { Router, Request , Response , NextFunction } from "express";
import { createUser, getCurrentUser, login } from "../services/auth.service";
import auth from "../Middilewares/auth.middleware";
import HttpException from "../utils/http-exception";


const router = Router();

router.post("/auth/register",async (req:Request,res:Response,next:NextFunction) => {
    try {
        const user = await createUser(req.body)
        res.json({user})
    } catch (error) {
        next(error)
    }
})

router.post("/auth/lOgin",async (req:Request,res:Response,next:NextFunction) => {
    try {
        const user = await login(req.body)
        if(user){
            res.json({user})
        }
        else{
            throw new HttpException(404, 'User not found');
        }
    } catch (error) {
        console.log('Error caught in login route:', error);
        next({
            errorCode: error.errorCode,
            message: error.message,
        })
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