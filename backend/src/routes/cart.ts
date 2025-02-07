import express from 'express';
import asyncErrorHandler from '../utils/AsyncErrorHandler';
import { addToCart } from '../controller/cartController';

const router = express.Router();

router.post('/addProduct', asyncErrorHandler(addToCart));

export default router;
