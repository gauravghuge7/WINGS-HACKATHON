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

const upload from '../middlewares/multerMiddleware.js';


userEventRouter.route("/getAllUserEvents/:userId")
                .get(upload.none(), getAllUserEvents);

userEventRouter.route("/RegisterForEvent/:id")
                .post(upload.none(), RegisterForEvent);

userEventRouter.route("/UnRegisterForEvent/:id")
                .post(upload.none(), UnRegisterForEvent);

userEventRouter.route("/likeEvent/:id")
                .post(likeEvent);

userEventRouter.route("/dislikeEvent/:id")
                .post(dislikeEvent);

userEventRouter.route("/bookmarkEvent/:id")
                .post(bookmarkEvent);

userEventRouter.route("/unbookmarkEvent/:id")
                .post(unbookmarkEvent);

userEventRouter.route("/BookmarkedEvents/:userId")
                .get(BookmarkedEvents);

userEventRouter.route("/LikedEvents/:userId")
                .get(LikedEvents);

userEventRouter.route("/generateAIDescription")
                .post(generateAIDescription);                

export default userEventRouter;

