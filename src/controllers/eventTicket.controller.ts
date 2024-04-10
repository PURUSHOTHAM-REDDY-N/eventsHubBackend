
import { Router, Request , Response , NextFunction } from "express";
import auth from "../Middilewares/auth.middleware";
import { getEventTicketsByEventId } from "../services/eventTicket.service";


const router = Router();


router.get('/eventTicket/getEventTicketsByEventId',auth, async (req:Request,res:Response,next:NextFunction)=>{
    try {
      const eventTickets = await getEventTicketsByEventId(req.query.event_id as string)
      res.json(eventTickets)
    } catch (error) {
      next(error)
    }
  }
)

// router.post('/eventTicket/purchaseEventTicketByTicketId',auth, async (req:Request,res:Response,next:NextFunction)=>{
//     try {
//       const eventTickets = await purchaseEventTicketByTicketId(req.query.event_id as string)
//       res.json(eventTickets)
//     } catch (error) {
//       next(error)
//     }
//   }
// )


  export default router
  