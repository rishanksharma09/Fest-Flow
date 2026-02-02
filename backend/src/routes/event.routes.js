import { Router } from "express";
import { upload } from "../middlewares/multer.middleware.js";

import { verifyJwt } from "../middlewares/verifyJwt.middleware.js";
import { verifySocietyAdmin } from "../middlewares/verifySocietyAdmin.js";
import { getAllEvents, getEventBySlug } from "../controllers/event.controller.js";

export const eventRouter = Router()

eventRouter.route("/get-all-events").get(getAllEvents)

eventRouter.route("/:eventSlug").get(getEventBySlug)


//Secured routes



