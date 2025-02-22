import { Router } from "express";
import { showAllEvents, viewEventDetails } from "../../controllers/V1/Admin/admin.event.controller.js";
import isAdminLoggedIn from "../../middlewares/adminMiddlewares/isAdminLogin.js";


const adminEvenRouter = Router();


adminEvenRouter.route("/showAllEvents")
   .get(
      isAdminLoggedIn,
      showAllEvents
   )


adminEvenRouter.route("/viewEventDetails/:eventId")
   .get(
      isAdminLoggedIn,
      viewEventDetails
   )


export default adminEvenRouter;