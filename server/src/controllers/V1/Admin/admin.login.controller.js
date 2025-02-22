import { emptyFieldValidator } from "../../../helper/userHelper/emptyFieldValidator.js";
import { Admin } from "../../../models/adminModels/admin.model.js";
import { ApiError } from "../../../utils/ApiError.js";
import { ApiResponse } from "../../../utils/ApiResponse.js";
import { asyncHandler } from "../../../utils/AsyncHandler.js";
import  jwt  from 'jsonwebtoken';
import { Event } from "../../../models/eventModels/event.model.js";
import User from "../../../models/userModels/user.model.js";
import { uploadOnCloudinary } from "../../../utils/cloudinary.js";
import mongoose from "mongoose";




const cookieOptions = {
     maxAge: 1000 * 60 * 60 * 24 * 7,
     httpOnly: true,
     secure: true,
     sameSite: 'lax',
}


const generateToken = (admin) => {

     const token = jwt.sign(
          {
               adminId: admin._id,
               adminFullName: admin.adminFullName,
               adminEmail: admin.adminEmail
          },
          process.env.JWT_SECRET,
          {
               expiresIn: "1d"
          }
     );

     return token;
}



const signupAdmin = asyncHandler( async (req, res, next) => {

     try {


          console.log(req.body);
          
          const {
               fullName : adminFullName,
               email: adminEmail,
               password : adminPassword
          } = req.body;

          console.log("adminFullName => ", req.body);

          emptyFieldValidator(adminFullName, adminEmail, adminPassword)

          const existedAdmin = await Admin.findOne({adminEmail});

          if(existedAdmin) {
               throw new ApiError(400, "Admin already exists in the system");
          }

          const admin = await Admin.create({
               adminFullName,
               adminEmail,
               adminPassword
          });


          return res 
          .status(201)
          .json(
               new ApiResponse(
                    201, 
                    "Admin created successfully",
                    {admin}
                    
               )
          )

          
     } 
     catch (error) {
          console.log("Error => ",error);
          throw new ApiError(500, error.message);
     }
})


const loginAdmin = asyncHandler(async (req, res) => {

     try {
          
          const { adminEmail, adminPassword } = req.body;
          
          emptyFieldValidator(adminEmail, adminPassword)

          const admin = await Admin.findOne({adminEmail});
          
          if(!admin) {
               throw new ApiError(400, "Admin not found");
          }

          const correctPassword = admin.isPasswordMatch(adminPassword);

          if(!correctPassword) {
               throw new ApiError(401, "incorrect password");
          }

          const token = generateToken(admin);

          console.log("token => ", token);   

          return res
          .status(200)
          .cookie("adminToken", token, cookieOptions)
          .json(
               new ApiResponse(
                    200, 
                    "Admin login successful",
                    {token}
               )
          )


     } 
     catch (error) {
          console.log("Error => ",error);
          throw new ApiError(500, error.message);
     }
})







const logoutAdmin = asyncHandler(async (req, res) => {      
     res.clearCookie("adminToken");
     return res.status(200).json(new ApiResponse(200, "Logged out successfully"));
})


const getAdmin = asyncHandler(async (req, res) => {
     try {
          const admin = await Admin.findById(req.admin.id);
          return res.status(200).json(new ApiResponse(200, "Admin fetched successfully", admin));
     } catch (error) {
          console.log(error);
          throw new ApiError(500, error?.message, error);
     }
})  ;



const updateProfile = asyncHandler(async (req, res) => {
     try {


          const {adminFullName, adminBio, adminSection, adminRole, adminMobileNumber } = req.body;

          console.log("req.body => ", req.body);

          const admin = await Admin.findById(req.admin.id);

          if(!admin) {
               throw new ApiError(400, "Admin not found");
          }

          
          const updatedAdmin = await Admin.findByIdAndUpdate(req.admin.id, {
               adminFullName,
               adminBio,
               adminSection,
               adminMobileNumber,
               adminRole
          }, { new: true });


          await admin.save();

          return res
               .status(200)
               .json(
                    new ApiResponse(200, "Profile updated successfully", updatedAdmin)
               );
     } 
     catch (error) {
          console.log(error);
          throw new ApiError(500, error?.message, error);
     }
})
 

const updateProfilePhoto = asyncHandler(async (req, res) => {
     try {
          
          const { id: adminId } = req.admin;

          const admin = await Admin.findById(adminId);
          if(!admin) {
               throw new ApiError(400, "Admin not found");
          }

          emptyFieldValidator(req.file);

          const response = await uploadOnCloudinary(req.file.path);

          if(!response) {
               throw new ApiError(400, "Failed to upload image");
          }

          admin.adminPhoto.secure_url = response.secure_url;
          admin.adminPhoto.public_url = response.public_url;
          admin.adminPhoto.public_id = response.public_id;
          await admin.save();

          return res
               .status(200)
               .json(
                    new ApiResponse(200, "Profile updated successfully", admin)
               );
     } 
     catch (error) {
          console.log(error);
          throw new ApiError(500, error?.message, error);
     }
})



export {
     signupAdmin,
     loginAdmin,
     logoutAdmin,
     getAdmin,
     updateProfile,
     updateProfilePhoto
}