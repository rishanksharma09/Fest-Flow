import asyncHandler from "../utils/asyncHandler.js"
import ApiError from "../utils/apiError.js";
import ApiResponse from "../utils/apiResponse.js";
import { User } from "../models/user.model.js";
import { deleteImageOnCloudinary, uploadImageOnCloudinary } from "../utils/cloudinary.js";
import jwt from "jsonwebtoken"

const options = {
  httpOnly: true,
  secure: true
}
const generateAccessAndRefreshToken = async (_id) => {
  try {
    const user = await User.findById(_id)
    if (!user) {
      throw new ApiError(400, "User does not exist")
    }

    const refreshToken = await user.generateRefreshToken()
    const accessToken = await user.generateAccessToken()

    user.refreshToken = refreshToken;
    await user.save({ validateBeforeSave: false })

    return { refreshToken, accessToken }
  } catch (error) {
    throw error
  }

}

export const registerUser = asyncHandler(async (req, res) => {
  const { name, username, email, password } = req.body;
  const avatar = req.file;

  if (!name || !email || !password || !username) {
    throw new ApiError(400, "Fill all the fields");
  }

  const existingEmail = await User.findOne({ email });
  if (existingEmail) {
    throw new ApiError(409, "User with this email already exists");
  }
  const existingUsername = await User.findOne({ username });
  if (existingUsername) {
    throw new ApiError(409, "User with this username already exists");
  }

  let cloudinaryAvatarResponse = { url: "", publicId: "" };

  if (avatar) {
    cloudinaryAvatarResponse = await uploadImageOnCloudinary(avatar.path);
  }

  const createdUser = await User.create({
    name,
    email,
    username,
    password,
    avatar: cloudinaryAvatarResponse,
    provider: "LOCAL",
  });

  const safeUser = await User.findById(createdUser._id).select("-password -refreshToken");

  return res
    .status(201)
    .json(new ApiResponse(201, safeUser, "User registered successfully"));
});

export const loginUser = asyncHandler(async (req, res) => {

  const { email, password } = req.body
  if (!email || !password) {
    throw new ApiError(400, "Fill all the fields")
  }

  const user = await User.findOne({ email })
  if (!user) {
    throw new ApiError(400, "User does not exist")
  }

  const isPasswordCorrect = await user.isPasswordCorrect(password);
  if (!isPasswordCorrect) {
    throw new ApiError(400, "Password not correct")
  }

  const { accessToken, refreshToken } = await generateAccessAndRefreshToken(user._id);

  return res.status(200)
    .cookie("accessToken", accessToken, options)
    .cookie("refreshToken", refreshToken, options)
    .json(new ApiResponse(200, user, "User logged in successfully"))


})

export const logoutUser = asyncHandler(async (req, res) => {
  const id = req.user._id
  if (!id) {
    throw new ApiError(400, "User not found")
  }
  const updatedUser = await User.findByIdAndUpdate(id,
    { $set: { refreshToken: "" } },
    { new: true, runValidators: false }

  );

  return res.status(200).clearCookie("accessToken", options).clearCookie("refreshToken", options).json(new ApiResponse(200, updatedUser, "User logout successfully"))


})

export const refreshAccessToken = asyncHandler(async (req, res) => {

  const incomingRefreshToken = req.cookies.refreshToken
  if (!incomingRefreshToken) {
    throw new ApiError(401, "Refresh Token not found ")
  }
  const decodedToken = jwt.verify(incomingRefreshToken, process.env.REFRESH_TOKEN_SECRET)

  if (!decodedToken) {
    throw new ApiError(401, "decoded token not found")
  }

  const user = await User.findById(decodedToken._id)

  if (!user) {
    throw new ApiError(401, "Invalid Refresh Token")
  }


  if (user.refreshToken !== incomingRefreshToken) {
    throw new ApiError(401, "Invalid Refresh Token")
  }


  const { refreshToken, accessToken } = await generateAccessAndRefreshToken(decodedToken._id)

  return res
    .status(200)
    .cookie("accessToken", accessToken, options)
    .cookie("refreshToken", refreshToken, options)
    .json(new ApiResponse(200, { accessToken, refreshToken }, "access and refresh token refreshed"))

})

export const changePassword = asyncHandler(async (req, res) => {
  const { oldPass, newPass } = req.body
  if (!oldPass || !newPass) {
    throw new ApiError(404, "fill the fields")
  }

  const user = await User.findById(req.user._id)

  if (!user) {
    throw new ApiError(404, "Unauthorized req")
  }

  const isCorrect = await user.isPasswordCorrect(oldPass)

  if (!isCorrect) {
    throw new ApiError(400, "Old password does not match")
  }

  user.password = newPass
  await user.save({ validateBeforeSave: false })


  return res
    .status(200)
    .json(new ApiResponse(200, {}, "password changed successfuly"))

})

export const getCurrentUser = asyncHandler(async (req, res) => {
  return res
    .status(200)
    .json(new ApiResponse(200, req.user, "current user fetched successfully"))
})

export const updateAccountDetails = asyncHandler(async (req, res) => {
  const { name, email, username } = req.body

  if (!name && !email && !username) {
    throw new ApiError(400, "All fields are empty")
  }

  const updateFields = {};



  const existingEmail = await User.findOne({ email });
  if (existingEmail) {
    throw new ApiError(409, "User with this email already exists");
  }
  const existingUsername = await User.findOne({ username });
  if (existingUsername) {
    throw new ApiError(409, "User with this username already exists");
  }

  if (name?.trim()) updateFields.name = name.trim();
  if (email?.trim()) updateFields.email = email.trim();
  if (username?.trim()) updateFields.username = username.trim();

  const user = await User.findByIdAndUpdate(
    req.user?._id,
    {
      $set: updateFields

    },
    { new: true }

  ).select("-password -refreshToken")

  return res
    .status(200)
    .json(new ApiResponse(200, user, "Account details updated successfully"))
});

export const updateUserAvatar = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user?._id)
  if (!user) {
    throw new ApiError(401, "Unauthorised request")
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
  const oldAvatarPublicId = user.avatar?.publicId;

  user.avatar = cloudinaryAvatarResponse;
  await user.save({ validateBeforeSave: false });

  await deleteImageOnCloudinary(oldAvatarPublicId)

  return res.status(200).json(new ApiResponse(200, user, "Avatar updated successfully"))

})

export const getRequestedSocieties = asyncHandler(async (req, res) => {
  const userId = req.user._id;

})

