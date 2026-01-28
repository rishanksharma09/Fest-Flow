import mongoose, { Schema } from "mongoose";

const adminSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    society: {
      type: Schema.Types.ObjectId,
      ref: "Society",
      required: true,
    },

    role: {
      type: String,
      enum: ["CORE", "EB"],
      required: true
    },

    permissions: {
      manageEvents: { type: Boolean, default: true },
      manageMembers: { type: Boolean, default: false },
      manageContent: { type: Boolean, default: false },
      manageSettings: { type: Boolean, default: false },
    },
  },
  {
    timestamps: true,
  }
);

/**
 * Prevent same user being admin of same society twice
 */
adminSchema.index({ user: 1, society: 1 }, { unique: true });

export const Admin = mongoose.models.Admin || mongoose.model("Admin", adminSchema);
