import { emptyFieldValidator } from "../../../helper/userHelper/emptyFieldValidator.js";
import { Admin } from "../../../models/adminModels/admin.model.js";
import { ApiError } from "../../../utils/ApiError.js";
import { ApiResponse } from "../../../utils/ApiResponse.js";
import { asyncHandler } from "../../../utils/AsyncHandler.js";
import  jwt  from 'jsonwebtoken';
import { Event } from "../../../models/eventModels/event.model.js";
import User from "../../../models/userModels/user.model.js";



const getUsers = asyncHandler(async (req, res) => {
      const { type } = req.params;
 
      if(type==="Blocked") {
           const users = await User.find({ isBlocked: true });
           return res.status(200).json(new ApiResponse(200, "All blocked users fetched successfully", users));
 
      } else if(type==="Unblocked") {
           const users = await User.find({ isBlocked: false });
           return res.status(200).json(new ApiResponse(200, "All unblocked users fetched successfully", users));
      }
 
 
      const users = await User.find();             
      return res.status(200).json(new ApiResponse(200, "All users fetched successfully", users));
 })
 
 
 
const getAllUsers = asyncHandler(async (req, res) => {
      try {
            const { page = 1, limit = 10, email = "", name = "" } = req.query;

            // Construct the search query
            const searchQuery = {};
            if (email) {
                  searchQuery.userEmail = { $regex: email, $options: "i" }; // Case-insensitive search
            }
            if (name) {
                  searchQuery.$or = [
                  { userFirstName: { $regex: name, $options: "i" } },
                  { userLastName: { $regex: name, $options: "i" } },
                  ];
            }

            // Fetch users with pagination
            const users = await User.find(searchQuery)
            .select("-password") // Exclude sensitive fields
            .limit(limit * 1) // Convert limit to a number
            .skip((page - 1) * limit) // Calculate the number of documents to skip
            .exec();

            // Get the total count of users matching the search query
            const totalUsers = await User.countDocuments(searchQuery);

            return res
            .status(200)
            .json(
                  new ApiResponse(
                        200,
                        "All users fetched successfully",
                        {
                              users,
                              total: totalUsers,
                              page: parseInt(page),
                              limit: parseInt(limit),
                        }
                  )
            );
      } 
      catch (error) {
            console.error("Error fetching users:", error);
            throw new ApiError(500, error?.message || "Failed to fetch users", error);
      }
});
 


const getBlockUsers = asyncHandler(async (req, res) => {
      try {
            const { page = 1, limit = 10, email = "", name = "" } = req.query;

            // Construct the search query
            const searchQuery = { isBlocked: true };
            if (email) {
                  searchQuery.userEmail = { $regex: email, $options: "i" }; // Case-insensitive search
            }
            if (name) {
                  searchQuery.$or = [
                  { userFirstName: { $regex: name, $options: "i" } },
                  { userLastName: { $regex: name, $options: "i" } },
                  ];
            }

            // Fetch users with pagination
            const users = await User.find(searchQuery)
            .select("-password") // Exclude sensitive fields
            .limit(limit * 1) // Convert limit to a number
            .skip((page - 1) * limit) // Calculate the number of documents to skip
            .exec();

            // Get the total count of users matching the search query
            const totalUsers = await User.countDocuments(searchQuery);

            return res.status(200).json(
            new ApiResponse(
            200,
            "All users fetched successfully",
            {
                  users,
                  total: totalUsers,
                  page: parseInt(page),
                  limit: parseInt(limit),
            }
            )
            );
      } 
      catch (error) {
            console.error("Error fetching users:", error);
            throw new ApiError(500, error?.message || "Failed to fetch users", error);
      }
});
 

 
const blockUnblockUser = asyncHandler(async (req, res) => {
      const { id } = req.params; // User ID from the URL
      const { isBlocked } = req.body; // Block/unblock status from the request body
    
      // console.log("req.body => ",req.body);

      // Find the user by ID
      const user = await User.findById(id);
    
      // If user not found, return an error
      if (!user) {
        throw new ApiError(400, "User not found");
      }
    
      // Update the user's isBlocked status
      const updatedUser = await user.updateOne({ isBlocked: isBlocked });

      // Save the updated user
      await user.save();

      // console.log("user => ", user);

      // Return success response
      return res.status(200).json(
        new ApiResponse(
          200,
          `User ${isBlocked ? "blocked" : "unblocked"} successfully`,
          {
            user : user
          }
        )
      );
});
 
 
    
const getUserInsights = asyncHandler(async (req, res) => {
      try {
         
            

            const blockedUsers = await User.find({ isBlocked: true });
            const registeredUsers = await User.countDocuments();
            const activeUsers = await User.countDocuments({ isBlocked: false });
            const totalUsers = await User.countDocuments();
            
 
            
            return res
            .status(200)
            .json(
                  new ApiResponse(
                        200, 
                        'User insights fetched successfully', 
                        {
                              activeUsers: activeUsers,
                              blockedUsers: blockedUsers.length,
                              registeredUsers: registeredUsers,
                              totalUsers: totalUsers
                        }
                  )
            );
      } 
      catch (error) {
            throw new ApiError(400, error.message);
      }
})
 

 
export {
     getUsers,
     getAllUsers,
     blockUnblockUser,
     getBlockUsers,
     getUserInsights
}