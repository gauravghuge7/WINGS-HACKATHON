
import { Router } from "express";
import { loginAdmin, signupAdmin, logoutAdmin, getAdmin, updateProfile, updateProfilePhoto } from "../../controllers/V1/Admin/admin.login.controller.js";  
import { upload } from './../../middlewares/multerMiddlerware/multer.middleware.js';
import isAdminLoggedIn from '../../middlewares/adminMiddlewares/isAdminLogin.js';
import faqRouter from './../faqRoutes/faqRoutes.js';
import adminEvenRouter from "./admin.event.routes.js";
import { blockEvent, showEvents, unblockEvent } from "../../controllers/V1/Admin/admin.event.controller.js";
import {  blockUnblockUser, getAllUsers, getBlockUsers, getUserInsights, getUsers  } from "../../controllers/V1/Admin/admin.user.controller.js";

const adminRouter = Router();


adminRouter.use("/faq", faqRouter)
adminRouter.use("/events", adminEvenRouter)

adminRouter.route("/signup")
   .post(
      upload.none(),
      signupAdmin
   )


adminRouter.route("/login")
           .post(
             upload.none(),
             loginAdmin
         )


adminRouter.route("/logout")
   .get(
      isAdminLoggedIn,
      logoutAdmin
   )


adminRouter.route("/getAdmin")
   .get(
      isAdminLoggedIn,
      getAdmin
   )


adminRouter.route("/showEvents/:type")
   .get(
      isAdminLoggedIn,
      showEvents
   )     


adminRouter.route("/block-event")
            .post(
                isAdminLoggedIn,
                upload.none(),
                blockEvent
            )


adminRouter.route("/unblock-event")
            .post(
                isAdminLoggedIn,
                upload.none(),
                unblockEvent
            )


adminRouter.route("/getUsers/:type")
            .get(
                isAdminLoggedIn,
                getUsers
            )


adminRouter.route("/blockUnblockUser/:id")
            .post(
                isAdminLoggedIn,
                upload.none(),
                blockUnblockUser
            )


adminRouter.route("/getAllUsers")
           .get(
               isAdminLoggedIn,
               getAllUsers
           )

adminRouter.route("/getBlockUsers")
           .get(
               isAdminLoggedIn,
               getBlockUsers
           )



adminRouter.route("/getUserInsights")
.get(
    isAdminLoggedIn,
    getUserInsights
)




adminRouter.route("/updateProfile")
           .put(
               isAdminLoggedIn,
               upload.none(),
               updateProfile
            )

adminRouter.route("/updateProfilePhoto")
           .post(
               isAdminLoggedIn,
               upload.single("photo"),
               updateProfilePhoto
            )


export default adminRouter;