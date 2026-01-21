import ApiError from "../utils/apiError.js";
import { Society } from "../models/society.model.js";



export const verifySocietyAdmin = async(req,res,next) => {
    try {
        const societySlug = req.params.societySlug;
        const oldSocietyInfo= await Society.findOne({slug:societySlug})
        if(!oldSocietyInfo){
            throw new ApiError(404,"Not found")
        }
    
        const isAdmin = oldSocietyInfo.admins?.some(
        (adminId) => adminId.toString() === req.user._id.toString()
      );
    
      if(!isAdmin){
        throw new ApiError(403,"Forbidden");
      }
    
      req.societyInfo=oldSocietyInfo;
      next()
    } catch (error) {
        next(error)
    }
}