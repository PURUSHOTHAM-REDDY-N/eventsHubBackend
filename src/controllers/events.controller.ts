import { Router, Request , Response , NextFunction } from "express";
import { createUser, getCurrentUser, login } from "../services/auth.service";
import auth from "../Middilewares/auth.middleware";
import HttpException from "../utils/http-exception";


const router = Router();

router.post("/events/createEvent",auth,async (req:Request,res:Response,next:NextFunction) => {
    try {
        const event = await createUser(req.body)
        res.json(event)
    } catch (error) {
        next(error)
    }
})

export default router;