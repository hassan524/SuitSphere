import express from 'express';
import connectDB from './config/db';
import cors from 'cors';

import auth from './routes/auth';
import cart from './routes/cart'; 
import order from './routes/order'

import cookieParser from 'cookie-parser';
import { Request, Response } from 'express';
import dotenv from 'dotenv';
dotenv.config();

const PORT = process.env.PORT || 5200;
const app = express();

app.use(
    cors({
        origin: function (origin, callback) {
            console.log("Origin:", origin); // Log this on the DEPLOYED backend!
            const allowedOrigins = [process.env.FRONTED_URL]; // Or an array of allowed origins
            if (!origin || allowedOrigins.includes(origin)) { // Allow all if no origin (e.g. Postman) or origin is in the allowed list
                callback(null, true);
            } else {
                callback(new Error('Not allowed by CORS'));
            }
        },
        credentials: true,
    })
);
app.use(express.json());
app.use(cookieParser());

app.use('/api/auth', auth);
app.use('/api/cart', cart);  
app.use('/api/order', order);  


app.get('/', (req: Request, res: Response) => {
    res.send('Server is running...');
});

connectDB()
    .then(() => {
        app.listen(PORT, () => {
            console.log(`Server Listening on Port ${PORT}`);
        });
    })
    .catch(err => {
        console.error("Error starting server:", err);
        process.exit(1);
    });
