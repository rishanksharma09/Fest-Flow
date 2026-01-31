import { Router } from "express";
import { upload } from "../middlewares/multer.middleware.js";

import { verifyJwt } from "../middlewares/verifyJwt.middleware.js";
import { verifySocietyAdmin } from "../middlewares/verifySocietyAdmin.js";

export const societyRouter = Router()

//Secured routes


societyRouter.route("/add").post(verifyJwt,upload.fields([
    { name: 'avatar', maxCount: 1 },
    { name: 'poster', maxCount: 1 }
]
), addSociety)

societyRouter.route("/get-all-societies").get(getAllSocieties)

societyRouter.route("/get-society-info/:societySlug").get(getSocietyInfo)
// Secured and admin verified
