
import express from "express"; // Import express
import { Router } from "express";

import {
    createEvent,
    deleteEvent,
    getAllEvents,
    getEventById,
    updateEvent,
    registerForEvent

} from "../../controllers/V1/Event/event.controller.js";

import { upload } from "../../middlewares/multerMiddlerware/multer.middleware.js";

const eventRouter = express.Router(); // Use express.Router()


// Route for creating an event
eventRouter.route("/create").post(upload.fields([{ name: "eventBanner" }, { name: "eventLogo" }]), createEvent);

// Route for getting all events
eventRouter.route("/getAll").get(getAllEvents);

// Route for getting an event by ID
eventRouter.route("/:id").get(getEventById);

// Route for registering for an event
eventRouter.route("/registerForEvent/:id").post(registerForEvent);

// like event
// eventRouter.route("/like").post(likeEvent);

// Route for updating an event by ID
eventRouter.route("/update/:id").put(updateEvent);

// Route for deleting an event by ID
eventRouter.route("/delete/:id").delete(deleteEvent);

export default eventRouter;
