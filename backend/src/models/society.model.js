import mongoose from "mongoose";
import slugify from "slugify"



const societySchema = new mongoose.schema({

    name: {
        type: String,
        required: true,
        trim: true,
        minlength: 2,

    },

    nickname: {
        type: String,
        required: true,
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

    isApproved: {
        type: Boolean
    },

    admins: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    }]

})


societySchema.pre('save', async function () {
    const baseSlug = slugify(this.name, { lower: true, strict: true });

    let slug = baseSlug;
    let count = 1;

    while (await society.exists({ slug })) {
        count++;
        slug = `${baseSlug}-${count}`;
    }
    this.slug=slug;
    return;

})






export const Society = new mongoose.model("Society", societySchema)