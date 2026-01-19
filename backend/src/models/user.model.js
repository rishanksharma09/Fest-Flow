import mongoose from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken"


const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      minlength: 2,
      maxlength: 50,
    },

    username: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
      unique: true,
      minlength: 3,
      maxlength: 30,
    },

    email: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
      unique: true,
    },

    password: {
      type: String,
      minlength: 6,
      select: false,
    },

    provider: {
      type: String,
      enum: ["LOCAL", "GOOGLE"]
    },

    avatar: {
      url: { type: String, default: "" },
      publicId: { type: String, default: "" },
    },

    role: {
      type: String,
      enum: ["USER", "SUPER_ADMIN"],
      default: "USER",
    },

    interestedCategories: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Category",
      },
    ],
    refreshToken:{
      type:String,
    }
  },
  { timestamps: true }
);

userSchema.pre('save', async function () {
  if (!this.isModified("password")) {
    return;
  }
  this.password = await bcrypt.hash(this.password, 10);
  return;
})

userSchema.method("isPasswordCorrect", async function (password) {
  return await bcrypt.compare(password, this.password)
})

userSchema.methods.generateAccessToken= async function () {
  return jwt.sign({
    _id: this._id,
    name: this.name,
    username: this.username,
    email: this.email
  }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: process.env.ACCESS_TOKEN_EXPIRY });
}

userSchema.methods.generateRefreshToken= function () {
  const refreshToken = jwt.sign({
    _id: this._id
  }, process.env.REFRESH_TOKEN_SECRET, { expiresIn: process.env.REFRESH_TOKEN_EXPIRY });
  return refreshToken;
}


export const User = mongoose.models.User || mongoose.model("User", userSchema);
