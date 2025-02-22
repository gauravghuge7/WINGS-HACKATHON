import { emptyFieldValidator } from "../../../helper/userHelper/emptyFieldValidator.js";
import { Admin } from "../../../models/adminModels/admin.model.js";
import { ApiError } from "../../../utils/ApiError.js";
import { ApiResponse } from "../../../utils/ApiResponse.js";
import { asyncHandler } from "../../../utils/AsyncHandler.js";
import  jwt  from 'jsonwebtoken';
import { Event } from "../../../models/eventModels/event.model.js";
import User from "../../../models/userModels/user.model.js";
import mongoose from "mongoose";



const showAllEvents = asyncHandler(async (req, res) => {
    try {

      const events = await Event.find({});
      return res
        .status(200)
        .json(new ApiResponse(200, "events fetched successfully", {events}));

    } 
    catch (error) {
      throw new ApiError(400, error.message);
    }
});


const viewEventDetails = asyncHandler(async (req, res) => {
  const { eventId } = req.params;
  emptyFieldValidator(eventId);

  const event = await Event.aggregate([
    {
      $match: {
        _id: new mongoose.Types.ObjectId(eventId)
      }
    },

    {
      $lookup: {
        from: "admin",
        localField: "eventOrganiser",
        foreignField: "_id",
        as: "eventOrganiser"
      }
    },
    {
      $addFields: {
        eventOrganiser: "$eventOrganiser.adminFullName"
      }
    },
    {
      $project: {
        eventOrganiser: 1,
        eventTitle: 1,
        eventDescription: 1,
        eventSubject: 1,
        eventType: 1,
        eventLocation: 1,
        eventRegistrationLastDate: 1,
        eventUserCapacity: 1,
        eventCategory: 1,
        eventRegisterdCount: 1,
        eventTeamMembers: 1,
        eventReviews: 1,
        eventBanner: 1,
        eventLogo: 1,
        eventContactDetails: 1,
        eventFAQ: 1,
        eventDate: 1,
        eventDuration: 1,
        eventTime: 1,
        eventLikes: 1,
        eventExpresions: 1,
        eventShares: 1,
        eventRegistedUsers: 1,
        eventBlocked: 1,
        eventCustomFormData: 1,
        bookmarkedBy: 1,        
        _id: 1
      }
    }

  ]);




  return res
  .status(200)
  .json(new ApiResponse(200, "Event fetched successfully", event[0]));


});


const blockEvent = asyncHandler(async (req, res) => {
  try {
    const { eventId } = req.body;
    emptyFieldValidator(eventId);
  
    const event = await Event.findById(eventId);
    event.eventBlocked = true;
    event.save();  
  
    return res
    .status(200)
    .json(new ApiResponse(200, "Event blocked successfully", event));
  } 
  catch (error) {
    throw new ApiError(400, error.message);
  }
})


const unblockEvent = asyncHandler(async (req, res) => {
  try {
    const { eventId } = req.body;
    emptyFieldValidator(eventId);
  
    const event = await Event.findById(eventId);
    event.eventBlocked = false;
    event.save();  
  
    return res
    .status(200)
    .json(new ApiResponse(200, "Unblocked Event successfully", event));
  } 
  catch (error) {
    throw new ApiError(400, error.message);
  }
})


const showEvents = asyncHandler(async (req, res) => {   
  const { type } = req.params;  

  if(type==="upcoming"){
       const events = await Event.find({isBlocked: false, eventDate: { $gte: new Date() } });
       return res.status(200).json(new ApiResponse(200, "All upcoming events fetched successfully", events));
       
  } else if(type==="past"){
       const events = await Event.find({ isBlocked: false, eventDate: { $lt: new Date() } });
       return res.status(200).json(new ApiResponse(200, "All past events fetched successfully", events));

  } else if(type==="current"){
       const events = await Event.find({ isBlocked: false, eventDate: { $gte: new Date(), $lt: new Date() } });
       return res.status(200).json(new ApiResponse(200, "All events fetched successfully", events));
  } 
  
  const events = await Event.find();                
  return res.status(200).json(new ApiResponse(200, "All events fetched successfully", events));
})



export {
      showAllEvents,
      viewEventDetails,
      blockEvent,
      unblockEvent,
      showEvents
}