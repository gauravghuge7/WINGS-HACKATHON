import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import mainRouter from './mainRouter.js';

dotenv.config();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());


app.use('/api/v1', mainRouter);


app.get('/', (req, res) => {
    res.send('<h1> 404 not Found <h1/>');
});



export default app;