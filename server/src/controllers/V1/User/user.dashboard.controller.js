
import { emptyFieldValidator } from '../../../helper/userHelper/emptyFieldValidator.js';
import User from '../../../models/userModels/user.model.js';
import validator from 'validator';
import {ApiError} from "../../../utils/ApiError.js";
import {ApiResponse} from "../../../utils/ApiResponse.js";
import { asyncHandler } from "../../../utils/AsyncHandler.js";
import { uploadOnCloudinary } from '../../../utils/cloudinary.js';
import { Event } from '../../../models/eventModels/event.model.js';



const getUserDashBoard = asyncHandler(async (req, res, next) => {

      try {


            const user = await User.findById(req.user.id);
            
            if(!user) {
                  throw new ApiError(400, 'User not found');
            }

            const userData = await User.aggregate([
                  {
                        $match: {
                            userEmail: user.userEmail
                        }
                  },
                  {
                        $lookup: {
                              from: "events",
                              localField: "_id",
                              foreignField: "user",
                              as: "events"
                        }
                  },
                  {
                        $addFields: {
                            events: "$events"
                        }
                  },
                  
                  {
                        $project: {

                              userFirstName: 1,
                              userLastName: 1,
                              email: 1,
                              events: 1,

                        }
                  }

            ]);

            
            const events = await Event.find({eventOrganiser: user._id});

            console.log("userData =>",userData);


            return res
                  .status(200)
                  .json(
                        new ApiResponse(
                              200, 
                              'User dashboard successfully', 
                              {
                                events,
                                userDashboard: userData
                              }
                        )
                  )

      } 
      catch (error) {
            throw new ApiError(500, error.message);
      }
});



const getUserProfile = asyncHandler(async (req, res, next) => {
    try {
        const user = await User.findById(req.user.id);

        if (!user) {
            throw new ApiError(400, 'User not found');
        }

        return res
            .status(200)
            .json(
                new ApiResponse(
                    200,
                    'User profile retrieved successfully',
                    { user }
                )
            );
    } 
    catch (error) {
        throw new ApiError(500, error.message);
    }
});
  
const updateUserProfile = asyncHandler(async (req, res, next) => {
    try {
        const { userFirstName, userLastName, email } = req.body;

        if (!userFirstName || !userLastName || !email) {
            throw new ApiError(400, 'All fields are required');
        }

        const user = await User.findById(req.user.id);

        if (!user) {
            throw new ApiError(400, 'User not found');
        }

        user.userFirstName = userFirstName;
        user.userLastName = userLastName;
        user.email = email;

        await user.save();

        return res
            .status(200)
            .json(
                new ApiResponse(
                    200,
                    'User profile updated successfully',
                    { user }
                )
            );
    } catch (error) {
        throw new ApiError(500, error.message);
    }
});
  
const updateUserProfilePhoto = asyncHandler(async (req, res, next) => {
    try {
        if (!req.file) {
            throw new ApiError(400, 'No file uploaded');
        }

        const user = await User.findById(req.user.id);

        if (!user) {
            throw new ApiError(400, 'User not found');
        }

        user.profilePhoto = req.file.path;

        const response = await uploadOnCloudinary(req.file.path);

        user.userProfilePicture.public_id = response.public_id;
        user.userProfilePicture.secure_url = response.secure_url;

        await user.save();

        return res
            .status(200)
            .json(
                new ApiResponse(
                    200,
                    'User profile photo updated successfully',
                    { user }
                )
            );
    } 
    catch (error) {
        throw new ApiError(500, error.message);
    }
});





export {
    getUserDashBoard,
    getUserProfile,
    updateUserProfile,
    updateUserProfilePhoto
}
