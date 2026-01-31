import { Router } from "express";
import { upload } from "../middlewares/multer.middleware.js";

import { verifyJwt } from "../middlewares/verifyJwt.middleware.js";
import { addAdminToSociety, addSociety, getAllSocieties, getSocietyInfo, updateSocietyAvatar, updateSocietyInfo, updateSocietyPoster } from "../controllers/society.controller.js";
import { verifySocietyAdmin } from "../middlewares/verifySocietyAdmin.js";
import { addEvent } from "../controllers/event.controller.js";

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

societyRouter.route("/:societySlug/update-society-info").patch(verifyJwt,verifySocietyAdmin,updateSocietyInfo)

societyRouter.route("/:societySlug/update-society-avatar").patch(verifyJwt,verifySocietyAdmin,updateSocietyAvatar)

societyRouter.route("/:societySlug/update-society-poster").patch(verifyJwt,verifySocietyAdmin,updateSocietyPoster)

societyRouter.route("/:societySlug/add-admin").post(verifyJwt,verifySocietyAdmin, addAdminToSociety)

societyRouter.route("/:societySlug/add-event").post(verifyJwt,verifySocietyAdmin,upload.single("poster"), addEvent)
