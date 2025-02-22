import mongoose from "mongoose";
import bcrypt from "bcrypt";

const adminSchema = new mongoose.Schema({
  adminFullName: {
      type: String,
      required: true,
  },
  adminEmail: {
    type: String,
    required: true,
  },
  adminPassword: {
    type: String,
    required: true,
  },

  adminMobileNumber: {
    type: String,
  },

  adminBio: {
    type: String,
    maxlength: 1000,
    
  },

  adminSection: {
    type: String,
    maxlength: 100,

  },

  adminPhoto: {
    public_url: {
        type: String,
    },
    secure_url: {
        type: String,
    },
    public_id: {
        type: String,
    },
  },

  adminRole: {
     type: String,
  },


  adminForgotPasswordToken: {
    type: String
  },

  adminPasswordToken: {
    type: String
  }


}, { timestamps: true });


adminSchema.methods = {
    async isPasswordMatch(password) {
        return await bcrypt.compare(password, this.adminPassword);
    }
}

adminSchema.pre("save", async function (next) {

    if(!this.isModified("adminPassword")) {
        return next();
    }

    this.adminPassword = await bcrypt.hash(this.adminPassword, 10);
    next();

  }
)





export const Admin = mongoose.model('Admin', adminSchema);

