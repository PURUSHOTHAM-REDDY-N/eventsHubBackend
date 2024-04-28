import { LoginInput, RegisterInput } from "../models/auth.model";
import bcrypt from "bcrypt";
import prisma from "../../prisma/prisma-client";
import generateToken from "../utils/token.utils";
import { Event } from "../models/events.model";
import { EventTicket } from "@prisma/client";
import  QueryString from "qs";

export const createEvent = async (input: Event) => {
  const event = await prisma.event.create({
    data: {
      title: input.title,
      description: input.description,
      start_date: input.start_date,
      start_time: input.start_time,
      end_time: input.end_time,
      event_type: input.event_type,
      event_location_type: input.event_location_type,
      event_location: input.event_location,
      creator_id: input.user.id,
      image: input.image,
    },
    select: {
      event_id: true,
    },
  });

  return event;
};

export const createEventTicket = async (input: EventTicket) => {
  const eventTicket = await prisma.eventTicket.create({
    data: {
      ticket_name: input.ticket_name,
      ticket_type: input.ticket_type,
      ticket_price: input.ticket_price,
      available_quantity: input.total_quantity,
      total_quantity: input.total_quantity,
      event_id: input.event_id,
    },
    select: {
      ticket_id: true,
    },
  });

  const event = await prisma.event.update({
    where: {
      event_id: input.event_id,
    },
    data: {
      event_status: "CREATED",
    },
  });
  console.log(event);

  return eventTicket;
};

export const getAllEventByUserAccount = async (input: string) => {
  const events = await prisma.event.findMany({
    where: {
      creator_id: input,
    },
    orderBy: {
      created_at: "desc",
    },
  });

  console.log(events);

  return events;
};

export const getAllEvents = async (take: string, lastCursor: string ) => {
  const result = await prisma.event.findMany({
    where:{
      start_date:{
        gte: new Date(),
      },
    },
    take: take ? parseInt(take as string) : undefined,
    ...(lastCursor!=='0' && {
      skip: 1, // Do not include the cursor itself in the query result.
      cursor: {
        event_id: lastCursor,
      },
    }),
    orderBy: {
      created_at: "desc",
    },
    
  });

  // console.log("results", result);

  if (result.length == 0) {
    return (
      {
        data: [],
        metaData: {
          lastCursor: null,
          hasNextPage: false,
        },
      }
    );
  }

  const lastPostInResults: any = result[result.length - 1];
  const cursor: any = lastPostInResults.event_id;

  const nextPage = await prisma.event.findMany({
    // Same as before, limit the number of events returned by this query.
    take: take ? parseInt(take as string) : 7,
    skip: 1, // Do not include the cursor itself in the query result.
    cursor: {
      event_id: cursor,
    },
    orderBy: {
      created_at: "desc",
    },
  });

  console.log('next page' , nextPage)

  const data = {
    data: result,
    metaData: {
      lastCursor: cursor,
      hasNextPage: nextPage.length > 0,
    },
  };

  return data;
};

export const getEventDetailsbyEventId = async (input: any) => {
  const event = await prisma.event.findUnique({
    where: {
      event_id: input,
    },
  });

  return event;
};

export const searchEventsByEventTitle = async (input:any)=>{
  const events = await prisma.event.findMany({
    where:{
      title:{
        search:input
      }
    }
    
  })

  return events;
}
