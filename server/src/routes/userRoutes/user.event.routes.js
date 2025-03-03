import { Router } from "express";
const userEventRouter = Router();
import { RegisterForEvent, UnRegisterForEvent, likeEvent, dislikeEvent, bookmarkEvent, unbookmarkEvent, BookmarkedEvents, LikedEvents, generateAIDescription, getAllUserEvents } from "../../controllers/V1/User/user.event.controller.js";
import isUserLoggedin from "../../middlewares/userMiddlewares/isUserLogin.js";

// register for event
userEventRouter.route("/register-for-event/:id")
      .post(RegisterForEvent);

// unregister for event
userEventRouter.route("/unregister-for-event/:id")
      .post(UnRegisterForEvent);

// like event
userEventRouter.route("/like/:id")
      .post(likeEvent);

// dislike event
userEventRouter.route("/dislike/:id")
      .post(dislikeEvent);

// bookmark event
userEventRouter.route("/bookmark/:id")
      .post(bookmarkEvent);

// unbookmark event
userEventRouter.route("/unbookmark/:id")
      .post(unbookmarkEvent);

// get All Bookmarked Events
userEventRouter.route("/bookmarked-events/:userId")
      .get(BookmarkedEvents);

// get All Liked Events
userEventRouter.route("/liked-events/:userId")
      .get(LikedEvents);

// get All User Events
userEventRouter.route("/getAllUserEvents")
      .get(
            isUserLoggedin,
            getAllUserEvents
      );

      userEventRouter.route("/api/generate-description")
      .post(generateAIDescription);


export default userEventRouter;