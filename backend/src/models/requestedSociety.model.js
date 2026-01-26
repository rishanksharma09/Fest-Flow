import mongoose from "mongoose";

const requestedSocietySchema = new mongoose.Schema({
    userId:{
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
    },
    societyId:{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Society",
    required: true,
    },
    status:{
        type: String,
        enum: ["PENDING", "APPROVED", "REJECTED"],
        default: "PENDING",
    }

},{ timestamps: true })

export const RequestedSociety = mongoose.model("RequestedSociety", requestedSocietySchema);