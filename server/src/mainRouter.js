import express from 'express';
import userRouter from './routers/userRouter.js';
import eventRouter from './routers/eventRouter.js';
import adminRouter from './routers/adminRouter.js';
const mainRouter = express.Router();


mainRouter.use('/admin', adminRouter);
mainRouter.use('/user', userRouter);
mainRouter.use('/event', eventRouter);




export default mainRouter;