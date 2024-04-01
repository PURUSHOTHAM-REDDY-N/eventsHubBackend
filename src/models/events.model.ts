import { User } from "./user.model";

export interface Event {
    event_id:string;
    creator_id:string;
    title:string;
    description:string;
    start_date:string;
    start_time:string;
    end_time:string;
    event_type:string;
    event_location:string;
    event_location_type:string;
    image?:string;
    user?:User
  }
  