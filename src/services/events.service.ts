import { LoginInput, RegisterInput } from "../models/auth.model";
import bcrypt from "bcrypt";
import prisma from "../../prisma/prisma-client";
import generateToken from "../utils/token.utils";
import { Event } from "../models/events.model";

export const createEvent = async (input: Event) => {


  const user = await prisma.event.create({
    data: {
      title: input.title.trim(),
      description:input.description.trim(),
      end_time:input.end_time,
      event_loaction_type:input.event_loaction_type.trim(),
      start_date:input.start_date,
      start_time:input.start_time,
      event_type:input.event_type.trim(),
      event_location:input.event_location.trim(),
      creator_id:input.creator_id,
      image:input.image,
    
    },
    select: {
      event_id:true
    },
  });

  return user;
};