import { Router } from "express";
import { upload } from "../middlewares/multer.middleware.js";
import { logoutUser, registerUser ,loginUser,refreshAccessToken} from "../controllers/user.controller.js";
import { verifyJwt } from "../middlewares/verifyJwt.middleware.js";

export const userRouter=Router()

userRouter.route("/register").post(upload.single("avatar"),registerUser)

userRouter.route("/login").post(loginUser)

//Secured routes

userRouter.route("/logout").post(verifyJwt,logoutUser)

userRouter.route("/refresh-access-token").post(verifyJwt,refreshAccessToken)