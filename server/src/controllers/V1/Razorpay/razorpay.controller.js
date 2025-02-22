import { razorpay } from "../../../app.js";
import { emptyFieldValidator } from "../../../helper/userHelper/emptyFieldValidator.js";
import { ApiError } from "../../../utils/ApiError.js";
import { ApiResponse } from "../../../utils/ApiResponse.js";
import { asyncHandler } from "../../../utils/AsyncHandler.js";


export const getRazorpayApiKey = (req, res) => {
    res.send(process.env.RAZORPAY_KEY_ID);
}


export const createOrder = asyncHandler(async (req, res) => {
    const { amount, currency, receipt } = req.body;

    emptyFieldValidator(amount, currency, receipt);

    try {
        const order = await razorpay.orders.create({
            amount: amount * 100, // Amount in smallest currency unit (e.g., paise for INR)
            currency,
            receipt,
        });
        
        res.send(new ApiResponse(200, 'Order created successfully', order));

    } catch (error) {
        console.error('Error creating order:', error);
        throw new ApiError(500, error.message);
    }

});



export const verifyPayment = asyncHandler(async (req, res) => {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;

    const hmac = crypto.createHmac('sha256', 'YOUR_KEY_SECRET');
    hmac.update(razorpay_order_id + '|' + razorpay_payment_id);
    const generatedSignature = hmac.digest('hex');

    if (generatedSignature === razorpay_signature) {
        res.send(new ApiResponse(200, 'Payment verified successfully'));
    } else {
        throw new ApiError(400, 'Invalid payment signature');
    }
})


export const getUserPayments = asyncHandler(async (req, res) => {
    const { email, contact } = req.body;

    emptyFieldValidator(email, contact);

    try {
        // Fetch all payments
        const payments = await razorpay.payments.all({
            from: '2023-01-01', // Optional: Specify a start date for filtering
            to: new Date().toISOString().slice(0, 10), // Optional: Specify an end date (today)
            count: 100, // Optional: Number of payments to fetch, max is 100
        });

        // Filter payments by email or contact
        const userPayments = payments.items.filter(payment => {
            return (
                (email && payment.email === email) || 
                (contact && payment.contact === contact)
            );
        });

        // res.status(200).json(userPayments);
        res.send(new ApiResponse(200, 'User payments fetched successfully', userPayments));

    } catch (error) {
        // console.error('Error fetching payment details:', error);
        throw new ApiError(500, error.message);
    }

})



export const generateReceipt = asyncHandler(async (req, res) => {
    const { paymentId, orderId, status, eventDate, eventTitle } = req.body;

    try {
        // Fetch payment details from Razorpay
        // const paymentDetails = await razorpay.payments.fetch(paymentId);

        // Validate the paymentId and orderId
        // if (paymentDetails.order_id !== orderId || paymentDetails.status !== status) {
        //     return res.status(400).send('Invalid payment details');
        // }

        // Render the receipt
        res.render('Receipt/receipt.ejs', { paymentId, orderId, status, eventTitle, eventDate });

    } catch (error) {
        console.error('Error fetching payment details:', error);
        res.status(500).send('Error generating receipt');
    }
});