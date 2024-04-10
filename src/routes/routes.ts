import { Router } from "express";
import authController from "../controllers/auth.controller"
import imageController from "../controllers/image.controller"
import eventsController from "../controllers/events.controller"
import eventTicketController from "../controllers/eventTicket.controller";

const api = Router()
    .use(authController)
    .use(eventsController)
    .use(imageController)
    .use(eventTicketController)
export default Router().use('/',api)