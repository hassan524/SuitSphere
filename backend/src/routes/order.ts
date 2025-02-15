import express from 'express';
import { CreateOrder, GetOrders } from '../controller/orderController';
import asyncErrorHandler from '../utils/AsyncErrorHandler';
import { authMiddleware } from '../middlewares/authMiddleware';

const router = express.Router();

router.post('/place-order', authMiddleware, asyncErrorHandler(CreateOrder))
router.get('/get-order', authMiddleware, asyncErrorHandler(GetOrders))


export default router;
