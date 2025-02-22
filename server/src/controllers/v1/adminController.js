
import { emptyFieldValidator } from '../../helper/emptyFieldValidator.js';
import Admin from '../../models/adminModel.js';
import validator from 'validator';
import ApiError from "../../utils/apiError.js";
import ApiResponse from "../../utils/apiResponse.js";
import asyncHandler from "../../utils/asyncHandler.js";
import jwt from "jsonwebtoken";

const cookieOptions = {
    maxAge: 1000 * 60 * 60 * 24 * 7,
    httpOnly: true,
    secure: true,
    sameSite: 'lax',
};

const register = asyncHandler(async (req, res, next) => {
    try {
        const { adminEmail, adminPassword, adminFullName, adminSection, adminBio, adminMobileNumber, adminPhoto } = req.body;
        
        const adminData = {
            adminEmail,
            adminPassword,
            adminFullName,
            adminSection,
            adminBio,
            adminMobileNumber,
            adminPhoto
        };

        console.log("data => ", adminData);

        emptyFieldValidator(adminData.adminEmail, adminData.adminPassword, adminData.adminFullName);
    
        if(!validator.isEmail(adminData.adminEmail)) {        
            throw new ApiError(400, 'Email is not valid');
        }
    
        const adminExist = await Admin.findOne({ adminEmail: adminData.adminEmail });
    
        if(adminExist) {
            throw new ApiError(400, 'Admin already exist');
        }
    
        const admin = await Admin.create(adminData);
        
        if(!admin) {
            throw new ApiError(400, 'Admin not created');
        }
    
        await admin.save();
        admin.adminPassword = undefined;
    
        return res
        .status(201)
        .json(
            new ApiResponse(
                201, 
                'Admin registered successfully', 
                {
                    admin
                }
            )
        );

    } catch (error) {
        throw new ApiError(500, error.message);
    }
});

const login = asyncHandler(async (req, res, next) => {
    const { adminEmail, adminPassword } = req.body;

    const adminData = {
        adminEmail,
        adminPassword
    };

    try {
        emptyFieldValidator(...Object.values(adminData)?.flat());

        if(!validator.isEmail(adminData.adminEmail)) {        
            throw new ApiError(400, 'Invalid email');
        }

        const admin = await Admin.findOne({ adminEmail: adminData.adminEmail });

        if(!admin) {
            throw new ApiError(400, 'Admin not found');
        }  
        
        if(!(await admin.isPasswordMatch(adminData.adminPassword))) {
            throw new ApiError(400, 'Password is not correct');
        }

        const token = await admin.generateJWTToken();
        admin.adminPassword = undefined;

        res.cookie('token', token, cookieOptions);

        return res
        .status(201)
        .json(new ApiResponse(201, 'admin login successfully', admin));

    } catch(err) {
        throw new ApiError(400, err.message);
    }
});

const logout = (req, res) => {
    res.cookie('token', null, {
        secure: true,
        maxAge: 0,
        httpOnly: true
    });

    res.send(new ApiResponse(200, 'Admin logged out successfully'));
}

const getAdmin = asyncHandler(async (req, res, next) => {
    try {
        const admin = await Admin.findById(req.params.adminId);
        
        if(!admin) {
            throw new ApiError(400, 'Admin not found');
        }
        
        return res
        .status(200)
        .json(
            new ApiResponse(
                200,
                'Admin found successfully',
                {
                    admin
                }
            )
        );
            
    } catch (error) {
        throw new ApiError(500, error.message);
    }
});

const updateAdmin = asyncHandler(async (req, res, next) => {
    try {
        const adminId = req.params.adminId;
        console.log("adminId => ", adminId);
        const { adminFullName, adminEmail, adminPassword, adminMobileNumber, adminBio, adminSection, adminPhoto } = req.body;
        
        const adminData = {
            adminFullName,
            adminEmail,
            adminPassword,
            adminMobileNumber,
            adminBio,
            adminSection,
            adminPhoto
        };      
        
        emptyFieldValidator(adminData.adminEmail, adminData.adminPassword, adminData.adminFullName, adminData.adminSection, adminData.adminBio, adminData.adminMobileNumber, adminData.adminPhoto);
    
        if(!validator.isEmail(adminData.adminEmail)) {        
            throw new ApiError(400, 'Email is not valid');
        }
        
        const admin = await Admin.findById(adminId);
        
        if(!admin) {
            throw new ApiError(400, 'Admin not found');
        }
        
        if(!(await admin.isPasswordMatch(adminData.adminPassword))) {
            throw new ApiError(400, 'Password is not correct');
        }

        adminData.adminPassword = undefined;        
        
        await admin.updateOne(adminData);
        
        return res
        .status(200)
        .json(
            new ApiResponse(
                200,
                'Admin updated successfully',
                {
                    admin
                }
            )
        );
            
    } catch (error) {
        throw new ApiError(500, error.message);
    }
});


export {
    register,
    login,
    logout,
    getAdmin,
    updateAdmin
};