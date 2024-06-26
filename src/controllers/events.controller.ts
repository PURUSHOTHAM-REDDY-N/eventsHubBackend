import { Router, Request, Response, NextFunction } from "express";
import { createUser, getCurrentUser, login } from "../services/auth.service";
import auth from "../Middilewares/auth.middleware";
import HttpException from "../utils/http-exception";
import {
  createEvent,
  createEventTicket,
  getAllEvents,
  getAllEventByUserAccount,
  getEventDetailsbyEventId,
  searchEventsByEventTitle,
} from "../services/events.service";

const router = Router();

router.post(
  "/events/createEvent",
  auth,
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      console.log(req);
      const event = await createEvent(req.body);
      res.json(event);
    } catch (error) {
      next(error);
    }
  }
);

router.post(
  "/events/createEventTicket",
  auth,
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const event = await createEventTicket(req.body);
      res.json(event);
    } catch (error) {
      next(error);
    }
  }
);

router.get(
  "/events/getAllEventByUserAccount",
  auth,
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const events = await getAllEventByUserAccount(req.body.user.id);
      res.json(events);
    } catch (error) {
      next(error);
    }
  }
);

router.get(
  "/events/getAllEvents",
  auth,
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const events = await getAllEvents(req.query.take as string,req.query.lastCursor as string);
      res.json(events);
    } catch (error) {
      next(error);
    }
  }
);

router.get(
  "/events/getEventDetailsbyEventId",
  auth,
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const events = await getEventDetailsbyEventId(req.query.event_id);
      res.json(events);
    } catch (error) {
      next(error);
    }
  }
);

router.get("/events/searchEventsByEventTitle",auth,async (req:Request,res:Response,next:NextFunction)=>{
  try {
    const events = await searchEventsByEventTitle(req.query.event_title)
    res.json(events);
  } catch (error) {
    next (error)
  }
})


export default router;
