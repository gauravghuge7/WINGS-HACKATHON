
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
  
      if (!user) {
        throw new ApiError(404, 'User not found');
      }
  
      // Fetch user data with events
      const userData = await User.aggregate([
        {
          $match: {
            _id: user._id,
          },
        },
        {
          $lookup: {
            from: 'events',
            localField: '_id',
            foreignField: 'eventOrganiser',
            as: 'events',
          },
        },
        {
          $project: {
            userFirstName: 1,
            userLastName: 1,
            email: 1,
            events: 1,
          },
        },
      ]);
  
      if (!userData || userData.length === 0) {
        throw new ApiError(404, 'User data not found');
      }
  
      // Extract events from userData
      const events = userData[0].events;
  
      return res
        .status(200)
        .json(
          new ApiResponse(
            200,
            'User dashboard fetched successfully',
            { events, userDashboard: userData[0] }
          )
        );
    } catch (error) {
      throw new ApiError(500, error.message || 'Failed to fetch user dashboard');
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
        const { userFirstName, userLastName, userEmail, userMobileNumber } = req.body;

        if (!userFirstName || !userLastName || !userEmail) {
            throw new ApiError(400, 'All fields are required');
        }

        const user = await User.findById(req.user.id);

        if (!user) {
            throw new ApiError(400, 'User not found');
        }

        user.userFirstName = userFirstName;
        user.userLastName = userLastName;
        user.userEmail = userEmail;
        user.userMobileNumber = userMobileNumber;

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
