import ApiError from "../utils/apiError.js";
import { Society } from "../models/society.model.js";
import { Admin } from "../models/admins.model.js";


export const  verifySocietyAdmin = async(req,res,next) => {
    try {
        const societySlug = req.params.societySlug;
        const oldSocietyInfo= await Society.findOne({slug:societySlug})
        if(!oldSocietyInfo){
            throw new ApiError(404,"Not found")
        }
    
        const isAdmin = await Admin.findOne({user:req.user._id,society:oldSocietyInfo._id})
    
      if(!isAdmin){
        throw new ApiError(403,"Forbidden");
      }
    
      req.societyInfo=oldSocietyInfo;
      next()
    } catch (error) {
        next(error)
    }
}