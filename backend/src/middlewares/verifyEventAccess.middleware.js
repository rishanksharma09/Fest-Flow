import ApiError from "../utils/apiError.js";
import { Admin } from "../models/admins.model.js";
import { Event } from "../models/event.model.js";


export const  verifyEventAccess = async(req,res,next) => {
    try {
        const eventSlug = req.params.eventSlug;
        const eventInfo= await Event.findOne({slug:eventSlug})
        if(!eventInfo){
            throw new ApiError(404,"Event not found")
        }

        const admin= await Admin.findOne({user:req.user._id,society:eventInfo.hostedBy})

        if(!admin){
            throw new ApiError(400,"Unauthorised request")
        }
        
        if(!admin.manageEvents){
            throw new ApiError(401,"Unauthorised request to manage Events")
        }
        req.event=eventInfo;
          next()
            
    } catch (error) {
        next(error)
    }
}