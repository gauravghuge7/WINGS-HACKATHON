import express from 'express';
const adminRouter = express.Router();

import { upload } from '../middlewares/multerMiddleware.js';
import { register, login, logout, getAdmin, updateAdmin } from '../controllers/v1/adminController.js';

adminRouter.route("/register")
            .post(upload.none(), register);

adminRouter.route("/login")
            .post(upload.none(), login);

adminRouter.route("/logout")  
            .get(logout);

adminRouter.route("/getAdmin/:adminId")
            .get(getAdmin);

adminRouter.route("/updateAdmin/:adminId")
            .put(upload.none(), updateAdmin);
    
            

export default adminRouter;