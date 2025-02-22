import express from "express";
import { createOrder, getRazorpayApiKey, getUserPayments, verifyPayment, generateReceipt } from "../../controllers/V1/Razorpay/razorpay.controller.js";
const paymentRouter = express.Router();

paymentRouter.route("/razorpay-key")
             .get(getRazorpayApiKey);



paymentRouter.route("/create-order")
             .post(createOrder);


paymentRouter.route("/verify-payment")
             .post(verifyPayment);



paymentRouter.route("/user-payments")
             .get(getUserPayments);


paymentRouter.route('/generateReceipt')
             .get(generateReceipt);



    

export default paymentRouter;       