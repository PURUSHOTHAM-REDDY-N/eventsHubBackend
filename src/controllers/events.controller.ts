import { Router, Request , Response , NextFunction } from "express";
import { createUser, getCurrentUser, login } from "../services/auth.service";
import auth from "../Middilewares/auth.middleware";
import HttpException from "../utils/http-exception";
import { createEvent, createEventTicket } from "../services/events.service";


const router = Router();

router.post("/events/createEvent",auth,async (req:Request,res:Response,next:NextFunction) => {
    try {
        console.log(req)
        const event = await createEvent(req.body)
        res.json(event)
    } catch (error) {
        next(error)
    }
})

router.post("/events/createEventTicket",auth,async (req:Request,res:Response,next:NextFunction) => {
    try {
        const event = await createEventTicket(req.body)
        res.json(event)
    } catch (error) {
        next(error)
    }
})

export default router;