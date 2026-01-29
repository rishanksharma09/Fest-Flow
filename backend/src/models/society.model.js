import mongoose from "mongoose";
import slugify from "slugify"



const societySchema = new mongoose.Schema({

    name: {
        type: String,
        required: true,
        trim: true,
        minlength: 2,

    },

    nickname: {
        type: String,
        trim: true,
        minlength: 2,
    },

    email: {
        type: String,
        required: true,
        trim: true,
        lowercase: true,
        unique: true,
    },
    website: {
        type: String,
        trim: true,
        lowercase: true,
    },

    slug: {
        type: String,
        unique: true,
        lowercase: true,
        unique: true,
    },

    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },

    avatar: {
        publicId: { type: String, default: "" },
        url: { type: String, default: "" },
    },

    poster: {
        publicId: { type: String, default: "" },
        url: { type: String, default: "" },
    },

    description: {
        type: String
    },

    about: {
        type: String
    },
    activeMembers: {
        type: Number,
        default: 0
    },

    status: {
        type: String,
        enum: ["PENDING", "APPROVED", "REJECTED"],
        default: "PENDING"
    },
}, { timestamps: true });

societySchema.pre('save', async function () {
    if(this.slug){
        return 
    }
    const baseSlug = slugify(this.name, { lower: true, strict: true });

    let slug = baseSlug;
    let count = 1;

    while (await Society.exists({ slug })) {
        count++;
        slug = `${baseSlug}-${count}`;
    }
    this.slug=slug;
    return;

})

export const Society = new mongoose.model("Society", societySchema)