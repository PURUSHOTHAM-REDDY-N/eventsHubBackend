import { Router, Request , Response , NextFunction } from "express";
import { createUser, getCurrentUser, login } from "../services/auth.service";
import auth from "../Middilewares/auth.middleware";
import HttpException from "../utils/http-exception";
import { multerConfig } from '../Middilewares/image.middleware';
import multer from "multer";
import { uploadToS3 } from "../services/s3.service";

const upload = multer(multerConfig);

const router = Router();

router.post("/image/upload",upload.single('image'),async (req:Request,res:Response,next:NextFunction) => {
    try {
        const imageUrl = `${req.file}`;
        const upload = await uploadToS3(req.file)
        res.json({ imagePath:`${upload.message}` });
    } catch (error) {
        next(error)
    }
})

export default router;