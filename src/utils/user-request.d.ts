declare namespace Express {
  export interface Request {
    user: {
      id: string;
      username: string;
      email: string;
      dob?: string;
      image?: string;
      country?: string;
    },
    file?:Multer.File
  }
}
