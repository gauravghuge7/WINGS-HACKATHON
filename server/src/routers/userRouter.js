import express from 'express';
import {
    register,
    login,
    logout,
    forgotPassword,
    resetPassword,
    signupUsingGoogle,
    loginUsingGoogle
} from '../controllers/v1/userController.js';

import { upload } from '../middlewares/multerMiddleware.js';



const userRouter = express.Router();

// register and set upload as middleware
userRouter.route('/register')
            .post(upload.none(), register);

// login
userRouter.route('/login')
          .post(upload.none(), login);


// logout
userRouter.route('/logout')
          .post(logout);


// forgotPassword
userRouter.route('/forgotPassword')
          .post(upload.none(), forgotPassword);

// resetPassword
userRouter.route('/resetPassword')
          .post(upload.none(), resetPassword);

// signupUsingGoogle
userRouter.route('/signupUsingGoogle')
          .post(upload.none(), signupUsingGoogle);

// loginUsingGoogle
userRouter.route('/loginUsingGoogle')
          .post(upload.none(), loginUsingGoogle);
        

export default userRouter;