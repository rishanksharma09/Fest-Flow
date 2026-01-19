import { User } from "../models/user.model.js";
import ApiError from "../utils/apiError.js";
import jwt from "jsonwebtoken";


export const verifyJwt=async(req,res,next)=>{
    try {
        const {accessToken,refreshToken}=req.cookies;
        const decodedAccessToken = jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET);
    
        if(!decodedAccessToken){
            throw new ApiError(401,"unauthorized request")
        }
    
        const user=await User.findById(decodedAccessToken._id).select("-password -refreshToken")
        if(!user){
            throw new ApiError("User not found")
        }
        req.user=user;
        next()
    } catch (error) {
        next(error)
    }
}