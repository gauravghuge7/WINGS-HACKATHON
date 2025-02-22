import express from 'express';
const adminRouter = express.Router();

import { upload } from '../middlewares/multerMiddleware.js';
import { register, login, logout } from '../controllers/v1/adminController.js';


adminRouter.route("/register")
            .post(upload.none(), register);

adminRouter.route("/login")
            .post(upload.none(), login);

adminRouter.route("/logout")  
            .get(logout);


export default adminRouter;