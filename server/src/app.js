import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import mainRouter from './mainRouter.js';
const app = express();
dotenv.config({
    path: '.env'
});

import morgan from 'morgan';
import asyncHandler from './utils/asyncHandler.js';
import ApiError from './utils/apiError.js';
app.use(morgan('dev'));


app.use(express.json());
app.use(express.urlencoded({ extended: true }));


const origins = [
    'http://localhost:5173',
]

app.use(cors({
    origin : origins,
    credentials: true
}))

app.use('/api/v1', mainRouter);


app.get('/', (req, res) => {
    res.send('<h1> 404 not Found <h1/>');
});


//  Not Found Route
app.use("*", asyncHandler(async (req, res) => {
    throw new ApiError(404, "404 Not Found path is not Available");
}));




export default app;