import mongoose from "mongoose";

const cloudinaryAssetSchema = new mongoose.Schema(
  {
    url: {
      type: String,
      required: true,
      trim: true,
    },
    publicId: {
      type: String,
      required: true,
      trim: true,
    },
  },
  { _id: false }
);

const eventSchema = new mongoose.Schema(
  {
    hostedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Society",
      required: true,
    },

    name: {
      type: String,
      required: true,
      trim: true,
    },

    startAt: {
      type: Date,
      required: true,
    },

    endAt: {
      type: Date,
      required: true,
    },

    location: {
      type: Object,
      default: {},
    },

    capacity: {
      type: Number,
      default: 0,
      min: 0,
    },

    categories: [
      {
        type: String,
        trim: true,
      },
    ],

    fee: {
      type: Number,
      default: 0,
      min: 0,
    },

    poster: {
      type: cloudinaryAssetSchema,
      default: null,
    },

    ui: {
      type: String,
      default: null,
    },

    registrationDeadline: {
      type: Date,
      default: null,
    },

    status: {
      type: String,
      enum: ["DRAFT", "PUBLISHED", "CANCELLED", "COMPLETED"],
      default: "DRAFT",
    },

    cancelationReason: {
      type: String,
      default: "",
      trim: true,
    },

    description: {
      type: String,
      default: "",
      trim: true,
    },

    visibility: {
      type: String,
      enum: ["PUBLIC", "ADMINS_ONLY"],
      default: "PUBLIC",
    },
  },
  { timestamps: true }
);

export const Event = mongoose.model("Event", eventSchema);