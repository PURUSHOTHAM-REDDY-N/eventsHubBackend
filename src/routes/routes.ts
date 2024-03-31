import { Router } from "express";
import authController from "../controllers/auth.controller"
import imageController from "../controllers/image.controller"

const api = Router()
    .use(authController)
    .use(imageController)
export default Router().use('/',api)