import mongoose from "mongoose";

const interestedEventSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    event: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Event",
      required: true,
    },
  },
  { timestamps: true }
);

interestedEventSchema.index({ user: 1, event: 1 }, { unique: true });

export const InterestedEvent = mongoose.model("InterestedEvent", interestedEventSchema);

