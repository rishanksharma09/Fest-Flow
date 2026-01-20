import { Router } from "express";
import { upload } from "../middlewares/multer.middleware.js";

import { verifyJwt } from "../middlewares/verifyJwt.middleware.js";
import { addSociety } from "../controllers/society.controller.js";


//Secured routes

export const societyRouter = Router()
societyRouter.route("/add").post(verifyJwt,upload.fields([
    { name: 'avatar', maxCount: 1 },
    { name: 'poster', maxCount: 1 }
]
), addSociety)