import { Router } from "express";
const router = Router();
import { RegisterForEvent, UnRegisterForEvent, likeEvent, dislikeEvent, bookmarkEvent, unbookmarkEvent, BookmarkedEvents, LikedEvents, generateAIDescription, getAllUserEvents } from "../../controllers/V1/User/user.event.controller.js";

// register for event
router.route("/register-for-event/:id")
      .post(RegisterForEvent);

// unregister for event
router.route("/unregister-for-event/:id")
      .post(UnRegisterForEvent);

// like event
router.route("/like/:id")
      .post(likeEvent);

// dislike event
router.route("/dislike/:id")
      .post(dislikeEvent);

// bookmark event
router.route("/bookmark/:id")
      .post(bookmarkEvent);

// unbookmark event
router.route("/unbookmark/:id")
      .post(unbookmarkEvent);

// get All Bookmarked Events
router.route("/bookmarked-events/:userId")
      .get(BookmarkedEvents);

// get All Liked Events
router.route("/liked-events/:userId")
      .get(LikedEvents);

// get All User Events
router.route("/user-events/:userId")
      .get(getAllUserEvents);

router.route("/api/generate-description")
      .post(generateAIDescription);

export default router;