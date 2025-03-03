import { Event } from '../../../models/eventModels/event.model.js';
import { ApiError } from '../../../utils/ApiError.js';
import { ApiResponse } from '../../../utils/ApiResponse.js';
import { asyncHandler } from '../../../utils/AsyncHandler.js';
import { emptyFieldValidator } from '../../../helper/userHelper/emptyFieldValidator.js';
import { io, users } from '../../../socket/socketServer.js';
import User from '../../../models/userModels/user.model.js';



const createEvent = asyncHandler(async (req, res, next) => {

    try {
        const {
            eventTitle,
            eventOrganiser,
            eventDescription,
            eventSubject,
            eventType,
            eventLocation,
            eventRegistrationLastDate,
            eventUserCapacity,
            eventDate,
            eventDuration,
            eventTime,
            eventContactDetails,
            eventTeamMembers,
            eventCustomFormData,
        } = req.body;

        // Validate required fields
        emptyFieldValidator(
            eventTitle,
            eventDescription,
            eventSubject,
            eventType,
            eventLocation,
            eventRegistrationLastDate,
            eventUserCapacity,
            eventDate,
            eventDuration,
            eventTime
        );

        // Validate eventCustomFormData fields (if provided)
        if (eventCustomFormData && typeof eventCustomFormData === 'object') {
            for (const key in eventCustomFormData) {
                    // console.log("print :", eventCustomFormData[key].heading)
                if (!eventCustomFormData[key].heading.trim()) {
                    throw new ApiError(400, `Field ${parseInt(key) + 1} in Custom Form Data cannot be empty`);
                }
            }
        }

        // Prepare data for the event
        const newEvent = new Event({
            eventTitle,
            eventOrganiser,
            eventDescription,
            eventSubject,
            eventType,
            eventLocation,
            eventRegistrationLastDate,
            eventUserCapacity,
            eventDate,
            eventDuration,
            eventTime,
            eventContactDetails: eventContactDetails || [], // Default empty array if not provided
            eventTeamMembers: eventTeamMembers || [], // Default empty array if not provided
            eventRegisteredCount: 0, // Initialize with 0 for new events
            eventCustomFormData: eventCustomFormData || {}, // Default empty object if not provided
        });

        // Save event to the database
        await newEvent.save();

        const db_users = await User.find();


        users.forEach((user) => {
            if (user) {

                const response = {
                    message: "New event registered"
                }
                console.log("user => ", user)

                io.to(user).emit("receiveNotification", {
                    response: response,
                });
            }
        });

        console.log("users => ", db_users)

        db_users.forEach((user) => {
            if (user) {
                io.to(user._id).emit("receiveNotification", {
                    message: "New Event Registered ",
                });
            }
        });


        
        
       

        return res
            .status(201)
            .json(new ApiResponse(200, 'Event created successfully', newEvent));


    } catch (error) {
        next(error); // Pass the error to error-handling middleware
    }
});




// Get all events
const getAllEvents = asyncHandler(async (req, res, next) => {
    const events = await Event.find();

    if (!events) {
        throw new ApiError(404, 'No events found');
    }

    return res
        .status(200)
        .json(new ApiResponse(200, 'Events fetched successfully', events));
});


// Get a single event by ID
const getEventById = asyncHandler(async (req, res, next) => {
    const { id } = req.params;

    const event = await Event.findById(id);

    if (!event) {
        throw new ApiError(404, 'Event not found');
    }

    res.send(new ApiResponse(200, 'Event fetched successfully', event));
});

// Update an event by ID
const updateEvent = asyncHandler(async (req, res, next) => {
    const { id } = req.params;
    // console.log("Incoming request body:", req.body); // Log the body
    const eventData = req.body;

    const event = await Event.findByIdAndUpdate(id, eventData, { new: true });

    console.log("Event :",event);
    
    if (!event) {
        throw new ApiError(404, 'Event not found');
    }

    res.send(new ApiResponse(200, 'Event updated successfully', event));
});



// Delete an event by ID
const deleteEvent = asyncHandler(async (req, res, next) => {
    const { id } = req.params;

    const event = await Event.findByIdAndDelete(id);

    if (!event) {
        throw new ApiError(404, 'Event not found');
    }

    res.send(new ApiResponse(200, 'Event deleted successfully', event));
});



// register user for event
const registerForEvent = asyncHandler(async (req, res, next) => {
    const { id } = req.params;
    const { userId } = req.body;

    const event = await Event.findById(id);

    if (!event) {
        throw new ApiError(404, 'Event not found');
    }


    // putting userId in eventRegisteredUsers array
    event.eventRegistedUsers.push(userId);
    event.save();

    // putting eventId into user's eventRegisteredEvents array
    const user = await User.findById(userId);
    user.userEventRegisteredEvents.push(event._id);
    user.save();

    return res
            .status(200)
            .json(new ApiResponse(200, 'Event registered successfully', event));
});



// live event
// const likeEvent = asyncHandler(async (req, res) => {
//     const { eventId } = req.params; 
//     const userId = req.user._id;    
    
//     const event = await Event.findById(eventId);    
// }


export {
    createEvent,
    getAllEvents,
    getEventById,
    updateEvent,
    deleteEvent,
    registerForEvent

};
