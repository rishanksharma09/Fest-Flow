import asyncHandler from "../utils/asyncHandler.js";
import ApiError from "../utils/apiError.js";
import ApiResponse from "../utils/apiResponse.js";
import { Event } from "../models/event.model.js";
import { Society } from "../models/society.model.js";
import { uploadImageOnCloudinary } from "../utils/cloudinary.js";


export const addEvent = asyncHandler(async (req, res) => {

  const {
    name, startAt, endAt,capacity,fee,description,location, registrationDeadline,registrationLink
  } = req.body;

  if(!name || !startAt ||  !endAt || !capacity ||  !location){
    throw new ApiError(404,"Fields missing")
  }
  const poster=req.file;
  let posterCloudinaryResponse={publicId:"",url:""}
  if(poster){
     posterCloudinaryResponse = await uploadImageOnCloudinary(poster.path);

  }

   const startDate = new Date(startAt);
  const endDate = new Date(endAt);
  let registrationDeadlineDate=null;
  if(registrationDeadline){
      registrationDeadlineDate =new Date(registrationDeadline);
    
  }

  if (startDate >= endDate) {
    throw new ApiError(400, "End date must be after start date");
  }


    const createdEvent = await Event.create({
        name,
        startAt:startDate,
        endAt:endDate,
        capacity:Number(capacity),
        fee:Number(fee),
        description,
        location,
        poster:posterCloudinaryResponse,
        registrationDeadline:registrationDeadlineDate,
        registrationLink,
        hostedBy: req.societyInfo._id
    });
    res.status(201).json(new ApiResponse(201,createdEvent, "Event created successfully" ));

});