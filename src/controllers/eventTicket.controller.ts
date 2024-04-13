
import { Router, Request , Response , NextFunction } from "express";
import auth from "../Middilewares/auth.middleware";
import { getEventTicketsByEventId ,purchaseEventTicketByTicketId,getPurchasedTicketsByAccount} from "../services/eventTicket.service";


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

router.post('/eventTicket/purchaseEventTicketByTicketId',auth, async (req:Request,res:Response,next:NextFunction)=>{
    try {
      const eventTickets = await purchaseEventTicketByTicketId(req.body)
      res.json(eventTickets)
    } catch (error) {
      next(error)
    }
  }
)

router.get('/eventTicket/getPurchasedTicketsByAccount',auth, async (req:Request,res:Response,next:NextFunction)=>{
  try {
    const eventTickets = await getPurchasedTicketsByAccount(req.body.user.id)
    res.json(eventTickets)
  } catch (error) {
    next(error)
  }
})


  export default router
  