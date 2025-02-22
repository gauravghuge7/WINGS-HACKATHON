import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import mainRouter from './mainRouter.js';
const app = express();
dotenv.config();

import morgan from 'morgan';
app.use(morgan('dev'));


app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());


app.use('/api/v1', mainRouter);


app.get('/', (req, res) => {
    res.send('<h1> 404 not Found <h1/>');
});



export default app;