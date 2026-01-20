import { Society } from "../models/society.model.js";
import ApiError from "../utils/apiError.js";
import asyncHandler from "../utils/asyncHandler.js";
import { deleteImageOnCloudinary, uploadImageOnCloudinary } from "../utils/cloudinary.js";
import ApiResponse from "../utils/apiResponse.js";
import fs from "fs/promises"

export const addSociety = asyncHandler(async (req, res) => {

    
    const { name, nickname, email, description } = req.body
    if (!name || !email) {

        if (req.files?.avatar?.[0]?.path) {
            await fs.unlink(req.files?.avatar?.[0]?.path)
        }

        if(req.files?.poster?.[0]?.path){
            await fs.unlink(req.files?.poster?.[0]?.path)
        }
        

        throw new ApiError(400, "Name and email required")

    }

    if(await Society.exists({email})){
         if (req.files?.avatar?.[0]?.path) {
            await fs.unlink(req.files?.avatar?.[0]?.path)
        }

        if(req.files?.poster?.[0]?.path){
            await fs.unlink(req.files?.poster?.[0]?.path)
        }
        throw new ApiError(409,"Society with this email already exists")
    }

    const avatar = req.files?.avatar?.[0];
    let avatarLocalPath = ""
    let avatarResponse = { publicId: "", url: "" }
    if (avatar) {
        avatarLocalPath = avatar.path
        avatarResponse = await uploadImageOnCloudinary(avatarLocalPath);
    }

    const poster = req.files?.poster?.[0];
    let posterLocalPath = ""
    let posterResponse = { publicId: "", url: "" }
    if (poster) {
        posterLocalPath = poster.path
        posterResponse = await uploadImageOnCloudinary(posterLocalPath);
    }

    const society = await Society.create({
        name,
        nickname,
        email,
        description,
        createdBy: req.user._id,
        admins: [req.user._id],
        avatar: avatarResponse,
        poster: posterResponse
    })

    return res
        .status(201)
        .json(new ApiResponse(201, society, "Society created successfully"));


})
