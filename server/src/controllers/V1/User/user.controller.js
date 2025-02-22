import { emptyFieldValidator } from '../../../helper/userHelper/emptyFieldValidator.js';
import User from '../../../models/userModels/user.model.js';
import validator from 'validator';
import {ApiError} from "../../../utils/ApiError.js";
import {ApiResponse} from "../../../utils/ApiResponse.js";
import { asyncHandler } from "../../../utils/AsyncHandler.js";
import jwt from "jsonwebtoken";

const cookieOptions = {
    maxAge: 1000 * 60 * 60 * 24 * 7,
    httpOnly: true,
    secure: true,
    sameSite: 'lax',
};

const register = asyncHandler(async (req, res, next) => {
    try {
        const { userData } = req.body;
    
        emptyFieldValidator(userData.userEmail, userData.userPassword, userData.userFirstName, userData.userLastName);
    
        if(!validator.isEmail(userData.userEmail)) {        
            throw new ApiError(400, 'Email is not valid');
        }
    
    
        const userExist = await User.findOne({ userEmail: userData.userEmail });
    
        if(userExist) {
            throw new ApiError(400, 'User already exist');
        }
    
        const user = await User.create(userData);
        
        if(!user) {
            throw new ApiError(400, 'User not created');
        }
    
    
        // File upload
    
        // if(req.file) {
    
        //     try {
        //         const result = await cloudinary.v2.uploader.upload(req.file.path, {
        //             folder: 'lms',
        //             width: 250,
        //             height: 250,
        //             gravity: 'faces',
        //             crop: 'fill'
        //         });
    
        //         if(result) {
        //             user.avatar.public_id = result.public_id;
        //             user.avatar.secure_url = result.secure_url;
    
        //             // remove file from local (uploads)
        //             fs.rm(`uploads/${req.file.filename}`);
        //         }
    
        //     } catch(err) {
        //         return next(new AppError(err || 'file not uploaded, please try again', 500));
        //     }
        // }
    
        await user.save();
        user.password = undefined;
    
        // // login after register
        // const token = await user.generateJWTToken();
        // res.cookie('token', token, cookieOptions);
    
    
        return res
        .status(201)
        .json(
            new ApiResponse(
                201, 
                'User registered successfully', 
                {
                    user
                }

            )
        );
    } 
    catch (error) {
        throw new ApiError(500, error.message);
    }
})





const login = asyncHandler(async (req, res, next) => {
    const { userData } = req.body;

    try {


        emptyFieldValidator(...Object.values(userData)?.flat());

        if(!validator.isEmail(userData.userEmail)) {        
            throw new ApiError(400, 'Invalid email');
        }

        const user = await User.findOne({ userEmail: userData.userEmail });

        if(!user) {
            throw new ApiError(400, 'User not found');
        }  
        
        if(!(await user.isPasswordMatch(userData.userPassword))) {
            throw new ApiError(400, 'Password is not correct');
        }

        const token = await user.generateJWTToken();
        user.userPassword = undefined;

        res.cookie('token', token, cookieOptions);

        return res
        .status(201)
        .json(new ApiResponse(201, 'user login successfully', user));

    } catch(err) {
        throw new ApiError(400, err.message);
    }
    
})

const signupUsingGoogle = asyncHandler(async (req, res, next) => {

    try {
        const { email,  given_name, family_name, email_verified, picture } = req.body;

        emptyFieldValidator(email, given_name, family_name, email_verified, picture);

        const user = await User.findOne({ userEmail: email });

        if(user) {
            throw new ApiError(400, 'User already exists');
        }

        if(!email_verified) {
            throw new ApiError(400, 'Email is not verified');
        }

        const userData = await User.create({
            
            userEmail: email,
            userPassword: "null",
            userFirstName: given_name,
            userLastName: family_name,
            userProfilePicture: {
                secure_url: picture,
                public_id: null
            }
        });

        return res
            .status(200)
            .json(
                new ApiResponse(200, 'User created successfully', {userData})
            )

    } 
    catch (error) {
        console.log("Error =>",error);
        throw new ApiError(400, error.message);
    }
})

const loginUsingGoogle = asyncHandler(async (req, res, next) => {

    try {
        const { email, email_verified } = req.body;

        emptyFieldValidator(email, email_verified);

        if(!email_verified) {
            throw new ApiError(400, 'Email is not verified');
        }

        const user = await User.findOne({ userEmail: email });

        if(!user) {
            throw new ApiError(400, 'User does not exist');
        }

        const token = await user.generateJWTToken();

        return res
            .status(200)
            .cookie('token', token, cookieOptions)
            .json(
                new ApiResponse(200, 'User created successfully', {user})
            )

    } 
    catch (error) {
        console.log("Error =>",error);
        throw new ApiError(400, error.message);
    }
})

const forgotPassword = asyncHandler(async (req, res, next) => {
    // try {
        const { userData } = req.body;  
    
        emptyFieldValidator(userData);
    
        if(!validator.isEmail(userData.userEmail)) {
            throw new ApiError(400, 'Email is required');
        }  
        
        const user = await User.findOne({ userEmail: userData.userEmail });
    
        if(!user) {
           throw new ApiError(400, 'User not found');
        }  
        
        const resetToken = await user.generatePasswordResetToken();
        await user.save();
    
        const resetPasswordUrl = `${process.env.FRONTEND_URL}/reset/${resetToken}`;
        console.log("resetToken :"+resetToken);
    
         // sendEmail
         const sub = "Reset Password";
         const message = `reset your password ...... ${process.env.FRONTEND_URL}/reset?resetToken=${resetToken}`;

         try {
            // await sendEmail(email, sub, message);
    
            res.send(new ApiResponse(200, 'Reset Password token has been send to ', resetPasswordUrl));
         } catch(err) { 
            user.forgotPasswordExpiry = undefined;
            user.forgotPasswordToken = undefined;
            
            await user.save();
            throw new ApiError(500, err.message);
         }
    
    // } catch (error) {
    //     throw new ApiError(500, error.message);
    // }
});




const logout = (req,res) => {
    res.cookie('token', null, {
        secure: true,
        maxAge: 0,
        httpOnly: true
    });

    res.send(new ApiResponse(200, 'User logged out successfully'));
}


const resetPassword = asyncHandler(async (req, res, next) => {
    const { resetToken, newPassword } = req.body;

    console.log(resetToken, newPassword);
    
    emptyFieldValidator({resetToken, newPassword});
    
    if(!validator.isHexadecimal(resetToken)) {
        throw new ApiError(400, 'Invalid reset token');
    }
    
    try {
        const user = await User.findOne({ forgotPassword: resetToken });
        
        if(!user) {
            throw new ApiError(400, 'User not found');
        }

        user.userPassword = newPassword;   
        user.forgotPassword = undefined;
        await user.save();
        
        res.send(new ApiResponse(200, 'Password reset successfully'));
    } catch(err) {
        throw new ApiError(500, err.message);
    }    
});


export {
    register,
    login,
    logout,
    forgotPassword,
    resetPassword,
    signupUsingGoogle,
    loginUsingGoogle
}