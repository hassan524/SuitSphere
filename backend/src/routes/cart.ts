import express from 'express';
import asyncErrorHandler from '../utils/AsyncErrorHandler';
import { addToCart, getCarts } from '../controller/cartController';
import { authMiddleware } from '../middlewares/authMiddleware';  

const router = express.Router();

router.post('/addProduct', authMiddleware, asyncErrorHandler(addToCart));
router.get('/getProduct', authMiddleware, asyncErrorHandler(getCarts));

export default router;
