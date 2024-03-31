import multer, { Multer } from 'multer';
import { Request, NextFunction, Response } from "express";
const path = require('path');

// Storage configuration for Multer
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, "public/images");
    },
    filename: (req, file, cb) => {
      cb(null, Date.now() + path.extname(file.originalname));
    },
  });

  const upload:Multer = multer({ storage });

export default upload;