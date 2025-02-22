import {ApiResponse} from "../../../utils/ApiResponse.js";
import {ApiError} from "../../../utils/ApiError.js";
import { Event } from '../../../models/eventModels/event.model.js';
import User from '../../../models/userModels/user.model.js';
import { asyncHandler } from "../../../utils/AsyncHandler.js";
import {GoogleGenerativeAI} from "@google/generative-ai";


const getAllUserEvents = asyncHandler(async (req, res, next) => {
    try {
        const { userId } = req.params;

        if (!userId) {
            throw new ApiError(400, "User ID is required");
        }

        const user = await User.findById(userId).populate({
            path: "userEnrolledEvents",
            select: "title description date location",
        });

        if (!user) {
            throw new ApiError(404, "User not found");
        }

        const events = await Event.find({ _id: { $in: user.userEnrolledEvents } });

        return res.status(200).json(
            new ApiResponse(200, "All User Events", events)
        );
    } catch (error) {
        throw new ApiError(500, error.message);
    }
});


const RegisterForEvent = asyncHandler(async (req, res, next) => {
    try {
        const { id } = req.params; // Event ID
        const { userId, formData } = req.body;

        if (!userId || !formData) {
            throw new ApiError(400, "User ID and form data are required.");
        }

        const event = await Event.findById(id);
        const user = await User.findById(userId);

        if (!event) {
            throw new ApiError(404, "Event not found");
        }

        if (!user) {
            throw new ApiError(404, "User not found");
        }

        // Check if user is already registered
        if (event.eventRegistedUsers.includes(userId)) {
            throw new ApiError(400, "User already registered for this event");
        }

        // Check if user is already enrolled
        if (user.userEnrolledEvents.includes(id)) {
            throw new ApiError(400, "User already enrolled in this event");
        }

        // Extract required fields from event's custom form
        const missingFields = [];
        event.eventCustomFormData.forEach((field) => {
            if (field.required && !formData[field.id]) {
                missingFields.push(field.heading);
            }
        });

        if (missingFields.length > 0) {
            return res.status(400).json({
                success: false,
                message: `Missing required fields: ${missingFields.join(", ")}`,
            });
        }

        // Register user for the event
        await Event.findByIdAndUpdate(
            id,
            { $push: { eventRegistedUsers: userId } },
            { new: true }
        );

        await User.findByIdAndUpdate(
            userId,
            { $push: { userEnrolledEvents: id } },
            { new: true }
        );

        return res
            .status(200)
            .json(new ApiResponse(200, "Event registered successfully", event));

    } catch (err) {
        throw new ApiError(500, err.message);
    }
});



const UnRegisterForEvent = asyncHandler(async (req, res, next) => {

    try {
        
        const { id } = req.params;
        const { userId } = req.body;

        const event = await Event.findById(id);
        const user = await User.findById(userId);

        if (!event) {
            throw new ApiError(404, 'Event not found');
        }

        if(!user) {
            throw new ApiError(404, 'User not found');
        }


        // Check if user is already registered for event
        if(!event.eventRegistedUsers.includes(userId)) {
            throw new ApiError(400, 'User not registered for this event');
        }

        // Check if user is already enrolled in event
        if(!user.userEnrolledEvents.includes(id)) {
            throw new ApiError(400, 'User not enrolled in this event');
        }

        await Event.findOneAndUpdate(
            { _id: id }, 
            { $pull: { eventRegistedUsers: userId } }, 
            { new: true }
          );
        
        await User.findOneAndUpdate(
            { _id: userId }, 
            { $pull: { userEnrolledEvents: id } }, 
            { new: true }
         );


        return res
                .status(200)
                .json(new ApiResponse(200, 'Event unregistered successfully', event));
        
    } catch(err) {
        throw new ApiError(500, err.message);
    }

}); 




const likeEvent = asyncHandler(async (req, res, next) => {

    try {
        const { id } = req.params;
        const { userId } = req.body;

        // console.log("id :", id+" userId :"+userId);

        const event = await Event.findById(id);
        const user = await User.findById(userId);

        if (!event) {
            throw new ApiError(404, 'Event not found');
        }

        if(!user) {
            throw new ApiError(404, 'User not found');
        }
        

        // check userId exist in eventLikes array
        if(event.eventLikes.includes(userId)) {
            throw new ApiError(400, 'User already liked this event');
        }


        // check eventId exist in userLikedEvents array
        if(user.likedEvents.includes(event._id)) {
            throw new ApiError(400, 'User already liked this event');
        }

        await Event.findOneAndUpdate(
            { _id: id },
            { $addToSet: { eventLikes: userId } }, // Ensures the userId is added only if it doesn't exist
            { new: true }
        );
        
        await User.findOneAndUpdate(
            { _id: userId },
            { $addToSet: { likedEvents: id } },
            { new: true }
        );

        return res.json(new ApiResponse(200, 'Event Liked successfully', event));

    } catch (error) {
        throw new ApiError(error.statusCode || 500, error.message);
    }
});



const dislikeEvent = asyncHandler(async (req, res, next) => {
    try {
        const { id } = req.params;
        const { userId } = req.body;

        console.log("eventId :", id);
        console.log("userId :", userId);
    
        const event = await Event.findById(id);
        const user = await User.findById(userId);
    
        if (!event) {
            throw new ApiError(404, 'Event not found');
        }

        if(!user) {
            throw new ApiError(404, 'User not found');
        } 
        
        
        // check that userId exist in eventLikes array
        if(!event.eventLikes.includes(userId)) {
            throw new ApiError(400, 'User not like this event');
        }

        // check that eventId exist in userLikedEvents array
        if(!user.likedEvents.includes(event._id)) {
            throw new ApiError(400, 'User not like this event');
        }
    

        await Event.findOneAndUpdate(
            { _id: id },
            { $pull: { eventLikes: userId } }, // Removes userId from eventLikes array
            { new: true }
        );
        
        await User.findOneAndUpdate(
            { _id: userId },
            { $pull: { likedEvents: id } }, // Removes eventId from likedEvents array
            { new: true }
        );
        
        

        return res.json(new ApiResponse(200, 'removed Like successfully', event));

    } catch(err) {
        throw new ApiError(500, err.message || "");
    }
   
});



const bookmarkEvent = asyncHandler(async (req, res, next) => {
    try {

        const { id } = req.params;
        const { userId } = req.body;
    
        const event = await Event.findById(id);
        const user = await User.findById(userId);
    
        if (!event) {
            throw new ApiError(404, 'Event not found');
        }

        if(!user) {
            throw new ApiError(404, 'User not found');
        }   
    
        
        // check userId exist in bookmarkedBy array
        if(event.bookmarkedBy.includes(userId)) {
            throw new ApiError(400, 'User already bookmarked this event');
        }

        // check eventId exist in userBookmarkedEvents array
        if(user.BookmarkedEvents.includes(id)) {
            throw new ApiError(400, 'User already bookmarked this event');
        }


        // Updating the event: Add userId to bookmarkedBy array
        await Event.findOneAndUpdate(
            { _id: id }, 
            { $addToSet: { bookmarkedBy: userId } },  // Ensures no duplicates
            { new: true, runValidators: true }
        );

        // Updating the user: Add eventId to BookmarkedEvents array
        await User.findOneAndUpdate(
            { _id: userId }, 
            { $addToSet: { BookmarkedEvents: event._id } }, // Ensures no duplicates
            { new: true, runValidators: true }
        );
        
        res.json(new ApiResponse(200, 'Event Bookmarked successfully', event));

    } catch(err) {
        throw new ApiError(500, err.message);
    }
   
});



const unbookmarkEvent = asyncHandler(async (req, res, next) => {

    try {

        const { id } = req.params;
        const { userId } = req.body;

        // console.log("eventId :", id);
        // console.log("userId :", userId);
    
        const event = await Event.findById(id);
        const user = await User.findById(userId);
        
        if(!user) {
            throw new ApiError(404, 'User not found');
        }

        if (!event) {
            throw new ApiError(404, 'Event not found');
        }

        // check that userId exist in bookmarkedBy array
        if(!event.bookmarkedBy.includes(userId)) {
            throw new ApiError(400, 'User not bookmark this event');
        }

        // check that eventId exist in userBookmarkedEvents array
        if(!user.BookmarkedEvents.includes(event._id)) {
            throw new ApiError(400, 'User not bookmark this event');
        }
    

        // Remove userId from event's bookmarkedBy array
        await Event.findOneAndUpdate(
            { _id: event._id }, 
            { $pull: { bookmarkedBy: userId } }, // Removes userId from array
            { new: true, runValidators: true }
        );

        // Remove eventId from user's BookmarkedEvents array
        await User.findOneAndUpdate(
            { _id: userId }, 
            { $pull: { BookmarkedEvents: event._id } }, // Removes eventId from array
            { new: true, runValidators: true }
        );

        
        res.json(new ApiResponse(200, 'Event UnBookmarked Successfully', event));

    } catch(err) {
        throw new ApiError(500, err.message);
    }
   
});     




const BookmarkedEvents = asyncHandler(async (req, res, next) => {

    try {

        const { userId } = req.params;

        if (!userId) {
            return next(new ApiError(400, "User ID is required"));
        }
    
        const user = await User.findById(userId).populate({
            path: "BookmarkedEvents",
            select: "title description date location",
        });
    
        if (!user) {
            return next(new ApiError(404, "User not found"));
        }
    
        const Events = await Event.find({ _id: { $in: user.BookmarkedEvents } });
    
        return res.status(200).json(
            new ApiResponse(200, "All Bookmarked Events", Events)
        );

    } catch (error) {
        return next(new ApiError(500, error.message));
    }
   
});



const LikedEvents = asyncHandler(async (req, res, next) => {    
    try {
        const { userId } = req.params;
        if (!userId) {
            return next(new ApiError(400, "User ID is required"));
        }
    
        const user = await User.findById(userId).populate({
            path: "likedEvents",
            select: "title description date location",
        });
    
        if (!user) {
            return next(new ApiError(404, "User not found"));
        }
    
        const Events = await Event.find({ _id: { $in: user.likedEvents } });
    
        return res.status(200).json(
            new ApiResponse(200, "All Liked Events", Events)
        );
        
    } catch (error) {
        return next(new ApiError(500, error.message));
    }
   
});



const generateAIDescription = asyncHandler(async (req, res, next) => {
    try {
      const { inputText } = req.body;
      
      // Initialize Google Gemini API client
      const genAI = new GoogleGenerativeAI(process.env.GOOGLE_GENERATIVE_AI);
      const model = genAI.getGenerativeModel({ model: "gemini-pro" });
  
      // Generate response
      const result = await model.generateContent(`Generate a concise event description in 25 to 30 words for: ${inputText}`);
      const response = await result.response;
      const text = response.text();
  
      console.log("AI Response:", text);
      res.json({ description: text });
  
    } catch (error) {
      console.error("Error =>", error);
      res.status(500).json({ error: error.message });
    }
  });
  





export {
    RegisterForEvent,
    UnRegisterForEvent,
    likeEvent,
    dislikeEvent,
    bookmarkEvent,
    unbookmarkEvent,
    BookmarkedEvents,
    LikedEvents,
    generateAIDescription,
    getAllUserEvents
    
}
