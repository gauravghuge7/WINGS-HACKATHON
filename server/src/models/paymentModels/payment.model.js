const mongoose = require('mongoose');

const paymentSchema = new mongoose.Schema({
    paymentName: {
        type: String,
        required: true,
    },
    paymentDescription: {
        type: String,
        required: true,
    },
    paymentDate: {
        type: Date,
        required: true,
    },
    paymentTime: {
        type: String,
        required: true,
     }, 
     paymentLocation: {
        type: String,
         required: true
     },
     paymentImage: {
        type: String,
         required: true
     },

     razorpay_payment_id: {
        type: String
      },
      razorpay_subscription_id: {
        type: String
      },
      razorpay_signature: {
        type: String
      },
      Event: {
        type: Schema.Types.ObjectId,
        required: true
      }
   });
   
   
const Payment = mongoose.model('Payment', paymentSchema);             
module.exports = Payment;