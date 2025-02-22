import mongoose, { Schema } from 'mongoose';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';  
import crypto from 'crypto';

const userSchema = new mongoose.Schema({
    userFirstName: {
        type: String,
        required: true,
        trim: true,
      },

      userLastName: {
        type: String,
        trim: true
      },

      userEmail: {
        type: String,
        required: true,
        lowercase: true,
        trim: true,
        unique: true,
      },

      userDOB: {
        type: Date,
      },

      userPassword: {
        type: String,
        required: true,
        trim: true,
        // minlength: 6
      },

      userProfilePicture: {
        
        public_id: {
          type: String,
          trim: true,
        },
    
        secure_url: {
          type: String,
          trim: true,
        },
      },

      userEvents: [

      ],

      userGender: {
        type: String
      },


      userEnrolledEvents: [
        
      ],

      userEventCertificates: [

      ],

      forgotPasswordToken: {
        type: String
      },

      forgotPasswordExpiry: {
        type: Date
      },

      isBlocked: {
        type: Boolean,  
        default: false
      },

      likedEvents:[{
        type: Schema.Types.ObjectId,
        ref: "Event"
      }],

      BookmarkedEvents:[{
        type: Schema.Types.ObjectId,
        ref: "Event"
      }],

}, { timestamps: true }, { optimisticConcurrency: true });



userSchema.pre("save", async function() {
  
  if(this.isModified("userPassword")) {
    console.log("this.userPassword =>", this.userPassword);
    this.userPassword = bcrypt.hashSync(this.userPassword, 10);
  }

  return true;
})

userSchema.methods = {
  generateJWTToken: async function() {
      return await jwt.sign(
          { id: this._id, email: this.userEmail },
          process.env.JWT_SECRET,
          {
              expiresIn: "24h",
          }
      );
  },


  isPasswordMatch: async function(plainTextPassword) {
    return (await bcrypt.compare(plainTextPassword, this.userPassword));
  },
  
  generatePasswordResetToken: async function() {
    const resetToken = crypto.randomBytes(20).toString('hex');

    this.forgotPasswordToken = crypto
        .createHash('sha256')
        .update(resetToken)
        .digest('hex');
        ;

    this.forgotPasswordExpiry = Date.now() + 15 * 60 * 1000;   // 15 min from now

    return this.forgotPasswordToken;
  }
}


const User = mongoose.model('User', userSchema);

export default User;