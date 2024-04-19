import { Request, Response, NextFunction } from "express";
import multer, { FileFilterCallback } from "multer";
import path = require("path");

type FileNameCallback = (error: Error | null, filename: string) => void;

export const multerConfig = {
  storage: multer.memoryStorage(),

  fileFilter: (
    req: Request,
    file: Express.Multer.File,
    cb: FileFilterCallback
  ) => {
    if (
      file.mimetype === "image/jpeg" ||
      file.mimetype === "image/png" ||
      file.mimetype === "image/jpg"
    ) {
      return cb(null, true); // Allow the file to be uploaded
    }
    cb(new Error("Unsupported file type")); // Reject the file
  },
};