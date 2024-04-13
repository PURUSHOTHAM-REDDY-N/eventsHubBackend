import prisma from "../../prisma/prisma-client";


export const getEventTicketsByEventId = async (input:string)=>{
    const eventTicket = await prisma.eventTicket.findMany({
        where: {
          event_id:input,
        },
       })
     
      return eventTicket;
  }


export const purchaseEventTicketByTicketId = async (input:any)=>{
     await prisma.eventTicket.update({
        where: {
          ticket_id:input.ticket_id,
        },
        data:{
          available_quantity:(Number(input.available_quantity)-1).toString()
        }
       })


       const purchaseTicket = await prisma.purchasedTickets.create({
        data:{
          purchase_quantity:input.purchase_quantity,
          ticket_id:input.ticket_id,
          ticket_name:input.ticket_name,
          ticket_type:input.ticket_type,
          user_id:input.user.id
        }
       })
     
      return purchaseTicket;
  }


  export const getPurchasedTicketsByAccount = async (input:any)=>{
    const getPurchasedTickets = await prisma.purchasedTickets.findMany({
      where:{
        user_id:input
      }
    })

    return getPurchasedTickets;
  }