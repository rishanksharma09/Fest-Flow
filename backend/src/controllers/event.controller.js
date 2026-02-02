import asyncHandler from "../utils/asyncHandler.js";
import ApiError from "../utils/apiError.js";
import ApiResponse from "../utils/apiResponse.js";
import { Event } from "../models/event.model.js";
import { Society } from "../models/society.model.js";
import { uploadImageOnCloudinary } from "../utils/cloudinary.js";
import { deleteImageOnCloudinary } from "../utils/cloudinary.js";


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

export const getAllEvents = asyncHandler(async(req,res)=>{
  const limit = Number(req.query.limit) || 6;
  const page = Number(req.query.page) || 1;
  const skip = limit*(page-1);

  let matchStage = {}

 if (req.query.hostedBy) {
  const society = await Society.findOne({ slug: req.query.hostedBy })
    .select("_id")

  if (!society) {
    return res
      .status(200)
      .json(new ApiResponse(200, [], "Events fetched successfully"))
  }

  matchStage.hostedBy = society._id
}

const pipeline= []

if (Object.keys(matchStage).length > 0) {
  pipeline.push({ $match: matchStage })
}

pipeline.push(  { $sort: { startAt: -1 } },
  { $skip: skip },
  { $limit: limit },
  {
    $lookup: {
      from: "societies",
      localField: "hostedBy",
      foreignField: "_id",
      as: "hostedBy"
    }
  },
  {
    $unwind: {
      path: "$hostedBy",
      preserveNullAndEmptyArrays: true
    }
  },
  {
    $project: {
      name: 1,
      startAt: 1,
      endAt: 1,
      location: 1,
      "poster.url"  :1,
      "hostedBy._id": 1,
      "hostedBy.name": 1,
      "hostedBy.slug": 1,
      "hostedBy.avatar.url": 1
    }
  })



const events = await Event.aggregate(pipeline)

  if(!events){
    throw new ApiError(404,"No events to show");
  }

  return res.json(new ApiResponse(200,events,"Events fetched succesfully"))

})

export const getEventBySlug = asyncHandler(async(req,res)=>{


  const {eventSlug}= req.params;

  const event = await Event.aggregate([
  {
    $match: { slug: eventSlug }
  },
  {
    $lookup: {
      from: "societies",
      localField: "hostedBy",
      foreignField: "_id",
      as: "hostedBy"
    }
  },
    {
    $unwind: {
      path: "$hostedBy",
      preserveNullAndEmptyArrays: true
    }
  },
  {
    $project: {
      name: 1,
      description: 1,
      startAt: 1,
      endAt: 1,
      location: 1,
      slug: 1,
      "hostedBy._id": 1,
      "hostedBy.name": 1,
      "hostedBy.slug": 1,
      "hostedBy.avatar": 1
    }
  }
])

  if(!event){
    throw new ApiError(404,"Event not found")
  }
  return res.json(new ApiResponse(200,event,"Event Fetched successfully"))
})

export const editEvent = asyncHandler(async(req,res)=>{
  const eventInfo= req.event;
  const {
    name, startAt, endAt,capacity,fee,description,location, registrationDeadline,registrationLink
  } = req.body;

  const updatedInfo = {};

  if(name!==eventInfo.name){
    updatedInfo.name = name;
  }
    if(startAt!==eventInfo.startAt){
    updatedInfo.startAt = startAt;
  }
    if(endAt!==eventInfo.endAt){
    updatedInfo.endAt = endAt;
  }
    if(capacity!==eventInfo.capacity){
    updatedInfo.capacity = capacity;
  }
    if(fee!==eventInfo.fee){
    updatedInfo.fee = fee;
  }
    if(description!==eventInfo.description){
    updatedInfo.description = description;
  }
    if(location!==eventInfo.location){
    updatedInfo.location = location;
  }

    if(registrationDeadline!==eventInfo.registrationDeadline){
    updatedInfo.registrationDeadline = registrationDeadline;
  }

    if(registrationLink!==eventInfo.registrationLink){
    updatedInfo.registrationLink = registrationLink;
  }

   if (Object.keys(updatedInfo).length === 0) {
    throw new ApiError(400, "No valid fields provided for update")
  }

  const updatedEvent = await Event.findByIdAndUpdate(eventInfo._id,updatedInfo)
  if(!updatedEvent){
    throw new ApiError(404,"Event not updated")
  }
  return res.json(new ApiResponse(200,updatedEvent,"Event updated successfully"))

})

export const editEventPoster = asyncHandler(async(req,res)=>{


  const eventInfo = req.event

  const newPoster = req.file;
  if (!newPoster) {
    throw new ApiError(400, "No new poster given")
  }

  const newPosterPath = newPoster.path;

  if (!newPosterPath) {
    throw new ApiError(400, "No new Poster given")
  }

  let cloudinaryPosterResponse = { url: "", publicId: "" };

  if (newPoster) {
    cloudinaryPosterResponse = await uploadImageOnCloudinary(newPosterPath);
  }
  const oldPosterPublicId = eventInfo.poster?.publicId;

  eventInfo.poster = cloudinaryPosterResponse;
  await eventInfo.save({ validateBeforeSave: false });

  await deleteImageOnCloudinary(oldPosterPublicId)

  return res.status(200).json(new ApiResponse(200, eventInfo, "poster updated successfully"))
})