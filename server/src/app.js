import express from 'express';
import morgan from 'morgan';
import connectRouter from './mainRouter/connect.router.js';
import cors from "cors";
import Razorpay from 'razorpay';
import cookieParser from 'cookie-parser';
import path from 'path'; // for ejs
import ejsMate from 'ejs-mate';


/** Creating the express App */
const app = express();

app.use(morgan('dev'));
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// EJS start
import { fileURLToPath } from 'url';
import { ApiError } from './utils/ApiError.js';
import { asyncHandler } from './utils/AsyncHandler.js';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.set("view engine", "ejs"); // Set the view engine to ejs
app.set("views", path.join(__dirname, "views"));
app.engine("ejs", ejsMate);
app.use(express.static(path.join(__dirname, "/public")));
// EJS end

const allowedOrigins = process.env.CLIENT_URL;

app.use(cors({
    origin : allowedOrigins,
    credentials: true
}))


// Razorpay Configuration
const razorpay = new Razorpay({
    key_id: `${process.env.RAZORPAY_KEY_ID}`,
    key_secret: `${process.env.RAZORPAY_KEY_SECRET}`,
 });


//  Landing path
app.get("/", (req, res) => {
    return res.send("Welcome to the Server 😊");
});


//  Health Check
app.get("/health", (req, res) => {
    res.send("Server Healthy");
});

// Server api routes
app.use("/api/v1", connectRouter);

//  Not Found Route
app.use("*", asyncHandler(async (req, res) => {
    throw new ApiError(404, "404 Not Found path is not Available");
}));

export default app;


export {
    razorpay
 }