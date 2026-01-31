import mongoose from "mongoose";
import slugify from "slugify";
import { Society } from "./society.model.js";


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
    slug:{
      type:String,
      trim:true
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
        type: String,
        required: true,
      
    },

    capacity: {
      type: Number,
      default: 0,
      min: 0,
    },

    fee: {
      type: Number,
      default: 0,
      min: 0,
    },

    poster: {
      url: {
        type: String,
        trim: true,
      },
      publicId: {
        type: String,
        trim: true,
      }
    },
    registrationLink: {
      type: String,
      trim: true,
    },

    registrationDeadline: {
      type: Date,
      default: null,
    },

    status: {
      type: String,
      enum: ["DRAFT", "PUBLISHED", "COMPLETED"],
      default: "DRAFT",
    },
    description: {
      type: String,
      default: "",
      trim: true,
    },
  },
  { timestamps: true }
);

eventSchema.pre('save', async function(){
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

export const Event = mongoose.model("Event", eventSchema);