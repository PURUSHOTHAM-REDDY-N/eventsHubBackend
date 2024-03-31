import { Router, Request , Response , NextFunction } from "express";
import { createUser, getCurrentUser, login } from "../services/auth.service";
import auth from "../Middilewares/auth.middleware";
import HttpException from "../utils/http-exception";
import upload from "../Middilewares/image.middleware";
import multer from "multer";


const router = Router();

router.post("/image/upload",upload.single('image'),async (req:Request,res:Response,next:NextFunction) => {
    try {
        const imageUrl = `${req.file}`;
        res.json({ imagePath:`${imageUrl}` });
    } catch (error) {
        next(error)
    }
})

export default router;