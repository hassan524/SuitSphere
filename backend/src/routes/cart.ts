import express from 'express';
import asyncErrorHandler from '../utils/AsyncErrorHandler';
import { addToCart, getCarts, decreaseCartsQuantity, increaseCartsQuantity, RemoveCart } from '../controller/cartController';
import { authMiddleware } from '../middlewares/authMiddleware';  

const router = express.Router();

router.post('/addProduct', authMiddleware, asyncErrorHandler(addToCart));
router.get('/getProduct', authMiddleware, asyncErrorHandler(getCarts));
router.post('/decreaseCart', authMiddleware, asyncErrorHandler(decreaseCartsQuantity))
router.post('/increaseCart', authMiddleware, asyncErrorHandler(increaseCartsQuantity))
router.post('/removeCart', authMiddleware, asyncErrorHandler(RemoveCart))

export default router;
