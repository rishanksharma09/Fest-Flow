
import {v2 as cloudinary} from "cloudinary"
import fs from "fs/promises"


cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true,
});


export const uploadImageOnCloudinary = async (imagePath) => {

    const options = {
      use_filename: true,
      unique_filename: true,
      overwrite: true,
    };

    try {
      
      const result = await cloudinary.uploader.upload(imagePath, options);
      await fs.unlink(imagePath)

      return {publicId: result.public_id ,url: result.secure_url};
    } catch (error) {
      console.error(error);
      await fs.unlink(imagePath)
    }
};

export const deleteImageOnCloudinary = async(public_id) =>{
  try{
    const res=await cloudinary.uploader.destroy(public_id);
    console.log(res)

  }
  catch(err){
    throw err;
  }
}