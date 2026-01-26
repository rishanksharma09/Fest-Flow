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

        if (req.files?.poster?.[0]?.path) {
            await fs.unlink(req.files?.poster?.[0]?.path)
        }


        throw new ApiError(401, "Name and email required")

    }

    if (await Society.exists({ email })) {
        if (req.files?.avatar?.[0]?.path) {
            await fs.unlink(req.files?.avatar?.[0]?.path)
        }

        if (req.files?.poster?.[0]?.path) {
            await fs.unlink(req.files?.poster?.[0]?.path)
        }
        throw new ApiError(409, "Society with this email already exists")
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

export const getSocietyInfo = asyncHandler(async (req, res) => {
        const {societySlug} = req.params;

        const societyInfo = await Society.findOne({ slug: societySlug });

        if (!societyInfo) {
            throw new ApiError(404, "Society not found");
        }

        return res.status(200).json(new ApiResponse(200, societyInfo, "Society info fetched successfully"));
    })

export const updateSocietyInfo = asyncHandler(async (req, res) => {
    const { name, nickname, email, description } = req.body;

    if (!name && !nickname && !email && !description) {
        throw new ApiError(400, "Nothing edited");
    }

    const oldSocietyInfo = req.societyInfo;

    if (name?.trim()) oldSocietyInfo.name = name.trim();
    if (nickname?.trim()) oldSocietyInfo.nickname = nickname.trim();
    if (email?.trim()) oldSocietyInfo.email = email.trim();
    if (description?.trim()) oldSocietyInfo.description = description.trim();

    await oldSocietyInfo.save({ validateBeforeSave: false });

    return res
        .status(200)
        .json(new ApiResponse(200, oldSocietyInfo, "Society Updated Successfully"));
});

export const updateSocietyAvatar = asyncHandler(async (req, res) => {

    const societyInfo = req.societyInfo;

    if (!societyInfo) {
        throw new ApiError(404, "Not Found")
    }

    const newAvatar = req.file;
    if (!newAvatar) {
        throw new ApiError(400, "No new Avatar given")
    }

    const newAvatarPath = newAvatar.path;

    if (!newAvatarPath) {
        throw new ApiError(400, "No new Avatar given")
    }

    let cloudinaryAvatarResponse = { url: "", publicId: "" };

    if (newAvatar) {
        cloudinaryAvatarResponse = await uploadImageOnCloudinary(newAvatarPath);
    }
    const oldAvatarPublicId = societyInfo.avatar?.publicId;

    societyInfo.avatar = cloudinaryAvatarResponse;
    await societyInfo.save({ validateBeforeSave: false });

    await deleteImageOnCloudinary(oldAvatarPublicId)

    return res.status(200).json(new ApiResponse(200, societyInfo, "Avatar updated successfully"))

})

export const updateSocietyPoster = asyncHandler(async (req, res) => {

    const societyInfo = req.societyInfo;

    if (!societyInfo) {
        throw new ApiError(404, "Not Found")
    }

    const newPoster = req.file;
    if (!newPoster) {
        throw new ApiError(400, "No new Poster given")
    }

    const newPosterPath = newPoster.path;

    if (!newPosterPath) {
        throw new ApiError(400, "No new Poster given")
    }

    let cloudinaryPosterResponse = { url: "", publicId: "" };

    if (newPoster) {
        cloudinaryPosterResponse = await uploadImageOnCloudinary(newPosterPath);
    }
    const oldPosterPublicId = societyInfo.poster?.publicId;

    societyInfo.poster = cloudinaryPosterResponse;
    await societyInfo.save({ validateBeforeSave: false });

    await deleteImageOnCloudinary(oldPosterPublicId)

    return res.status(200).json(new ApiResponse(200, societyInfo, "Poster updated successfully"))

})

