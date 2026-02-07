import { Router } from "express";
import { upload } from "../middlewares/multer.middleware.js";
import { logoutUser, deleteRequestedSociety, registerUser ,loginUser,refreshAccessToken, changePassword, getCurrentUser, updateAccountDetails, updateUserAvatar,getRequestedSocieties} from "../controllers/user.controller.js";
import { verifyJwt } from "../middlewares/verifyJwt.middleware.js";

export const userRouter=Router()

userRouter.route("/register").post(upload.single("avatar"),registerUser)

userRouter.route("/login").post(loginUser)



//Secured routes

userRouter.route("/logout").post(verifyJwt,logoutUser)

userRouter.route("/refresh-access-token").post(verifyJwt,refreshAccessToken)

userRouter.route("/change-password").patch(verifyJwt,changePassword)

userRouter.route("/get-current-user").get(verifyJwt,getCurrentUser)

userRouter.route("/update-account-details").patch(verifyJwt,updateAccountDetails)

userRouter.route("/update-user-avatar").patch(verifyJwt,upload.single("avatar"),updateUserAvatar)

userRouter.route("/get-requested-societies").get(verifyJwt,getRequestedSocieties)

userRouter.route("/delete-requested-society/:societyId").delete(verifyJwt,deleteRequestedSociety)




