
import { Router } from "express";
import { login, register, forgotPassword, logout, resetPassword, signupUsingGoogle, loginUsingGoogle} from "../../controllers/V1/User/user.controller.js";
import { upload } from "../../middlewares/multerMiddlerware/multer.middleware.js";
import profileRouter from "./user.profile.routes.js";
import userEventRouter from "./user.event.routes.js";
import eventRouter from './../eventRoutes/event.route.js';

const userRouter = Router();



userRouter.use("/event", userEventRouter);
userRouter.use("/event", eventRouter);
userRouter.use("/profile", profileRouter);

userRouter
      .route("/signup")
      .post(
            upload.none(),
            register
      );

userRouter
      .route("/login")
      .post(
            upload.none(),
            login
      );

userRouter
      .route("/forgot-password")
      .post(forgotPassword);

userRouter
      .route("/logout")
      .get(logout);

userRouter
      .route("/reset-password")
      .post(resetPassword);


userRouter
      .route("/google-login")
      .post(
            upload.none(),
            loginUsingGoogle
      );

userRouter
      .route("/google-signup")
      .post(
            upload.none(),
            signupUsingGoogle
      );




export default userRouter;