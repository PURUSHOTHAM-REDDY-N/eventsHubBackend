import prisma from "../../prisma/prisma-client";


export const getEventTicketsByEventId = async (input:string)=>{
    const eventTicket = await prisma.eventTicket.findMany({
        where: {
          event_id:input,
        },
       })
     
      return eventTicket;
  }