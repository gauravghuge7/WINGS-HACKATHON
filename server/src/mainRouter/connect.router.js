import { Router } from "express";
import adminRouter from "../routes/adminRoutes/admin.routes.js";
import userRouter from "../routes/userRoutes/user.route.js";
import paymentRouter from "../routes/paymentRoutes/paymentRoute.js";
import eventRouter from "../routes/eventRoutes/event.route.js";
import reviewRouter from "../routes/reviewRoutes/review.route.js";

import faqRouter from "../routes/faqRoutes/faqRoutes.js";
import userEventRouter from "../routes/userRoutes/user.event.routes.js";


const connectRouter = Router();

// admin routes
connectRouter.use("/admin", adminRouter);

// user routes
connectRouter.use("/user", userRouter);

// payment routes
connectRouter.use("/payment", paymentRouter);

// event routes
connectRouter.use("/event", eventRouter);


connectRouter.use("/user-event", userEventRouter);

// review routes
connectRouter.use("/review", reviewRouter);

// faq Routes Tejas
connectRouter.use("/faq", eventRouter);




export default connectRouter;

