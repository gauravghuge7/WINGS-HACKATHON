import { Router } from "express";
import isUserLoggedin from './../../middlewares/userMiddlewares/isUserLogin.js';

import { upload } from './../../middlewares/multerMiddlerware/multer.middleware.js';
import {
    getUserDashBoard,
    getUserProfile,
    updateUserProfile,
    updateUserProfilePhoto
} from "../../controllers/V1/User/user.dashboard.controller.js";

const profileRouter = Router();

profileRouter.route("/getUserDashboard")
    .get(
        isUserLoggedin,
        getUserDashBoard
    );

profileRouter.route("/getUserProfile")
    .get(
        isUserLoggedin,
        getUserProfile
    );

profileRouter.route("/updateUserProfile")
    .put(
        isUserLoggedin,
        updateUserProfile
    );

profileRouter.route("/updateUserProfilePhoto")
    .post(
        isUserLoggedin,
        upload.single("photo"),
        updateUserProfilePhoto
    );


    

export default profileRouter;