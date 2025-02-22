import express from 'express';
const userEventRouter = express.Router();
const   {  RegisterForEvent,
        UnRegisterForEvent,
        likeEvent,
        dislikeEvent,
        bookmarkEvent,
        unbookmarkEvent,
        BookmarkedEvents,
        LikedEvents,
        generateAIDescription,
        getAllUserEvents } from "../controllers/v1/user.eventController.js";


userEventRouter.route("/getAllUserEvents")
                .get(getAllUserEvents);

userEventRouter.route("/RegisterForEvent")
                .post(RegisterForEvent);

userEventRouter.route("/UnRegisterForEvent")
                .post(UnRegisterForEvent);

userEventRouter.route("/likeEvent")
                .post(likeEvent);

userEventRouter.route("/dislikeEvent")
                .post(dislikeEvent);

userEventRouter.route("/bookmarkEvent")
                .post(bookmarkEvent);

userEventRouter.route("/unbookmarkEvent")
                .post(unbookmarkEvent);

userEventRouter.route("/BookmarkedEvents")
                .get(BookmarkedEvents);

userEventRouter.route("/LikedEvents")
                .get(LikedEvents);

userEventRouter.route("/generateAIDescription")
                .post(generateAIDescription);                

export default userEventRouter;

