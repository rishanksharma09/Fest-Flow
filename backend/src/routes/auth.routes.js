import { googleAuth, googleCallback } from "../controllers/auth.controller.js"
import { Router } from "express"

export const authRouter = Router()

authRouter.route("/google").get(googleAuth)

authRouter.route("/google/callback").get(googleCallback)