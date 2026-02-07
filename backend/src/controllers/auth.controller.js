import { oauth2Client } from "../utils/googleAuth.js";
import asyncHandler from "../utils/asyncHandler.js";
import { google } from "googleapis";
import { User } from "../models/user.model.js";
import { uploadImageOnCloudinary } from "../utils/cloudinary.js";
import { generateUsernameFromName } from "../utils/generateUsernameFromName.js";
import { generateAccessAndRefreshToken } from "./user.controller.js";


const options = {
  httpOnly: true,
  secure: true
}

export const googleAuth = asyncHandler(async (req, res) => {
    const url = oauth2Client.generateAuthUrl({
        scope: ["email", "profile"],
        access_type: "offline",
        prompt: "consent",
    });

    res.redirect(url);
});

export const googleCallback = async (req, res) => {
    const { code } = req.query;

    const { tokens } = await oauth2Client.getToken(code);
    oauth2Client.setCredentials(tokens);

    const oauth2 = google.oauth2("v2");
    const { data } = await oauth2.userinfo.get({
        auth: oauth2Client,
    });

    console.log(data)

    const existingEmail = await User.findOne({ email: data.email })

    if (existingEmail) {
        throw new ApiError(409, "User with this email already exists");
    }


    const username = generateUsernameFromName(data.name)


    const createdUser = await User.create({
        name: data.name,
        email: data.email,
        username,
        avatar: {
            url: data.picture
        },
        provider: "GOOGLE",
    });

    const { accessToken, refreshToken } = await generateAccessAndRefreshToken(createdUser._id);

   

    return  res.cookie("accessToken", accessToken, options)
        .cookie("refreshToken", refreshToken, options).redirect("http://localhost:3000/");
};

