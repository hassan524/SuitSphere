import { Request, Response } from "express";
import OrderModel from "../models/OrderModel";

export interface IRequest extends Request {
    userId?: string;
}

export const CreateOrder = async (req: IRequest, res: Response) => {
    try {
        const { carts, address, PaymentMethod } = req.body;
        const userId = req.userId;

        if (!userId) {
            return res.status(401).json({ message: "Unauthorized access" });
        }

        if (!Array.isArray(carts) || carts.length === 0) {
            return res.status(400).json({ message: "Cart items are required" });
        }

        if (!address || typeof address !== "string") {
            return res.status(400).json({ message: "Address is required and must be a string" });
        }

        const validPaymentMethods = ["Cash on Delivery", "Stripe", "Razorpay"];
        if (!PaymentMethod || !validPaymentMethods.includes(PaymentMethod)) {
            return res.status(400).json({ message: "Invalid payment method" });
        }

        const existingOrder = await OrderModel.findOne({
            authorID: userId,
            date: { $gte: new Date(Date.now() - 24 * 60 * 60 * 1000) },
        });

        if (existingOrder) {
            return res.status(400).json({
                message: "You can only place one order every 24 hours.",
            });
        }

        const newOrder = new OrderModel({
            authorID: userId,
            address,
            carts,
            PaymentMethod,
            date: new Date(),
        });

        await newOrder.save();

        return res.status(201).json({
            message: "Order placed successfully",
            order: newOrder,
        });
    } catch (error) {
        console.error("Order Error:", error);

        if (error instanceof Error) {
            return res.status(500).json({
                message: "Server error while placing order",
                error: error.message,
            });
        } else {
            return res.status(500).json({
                message: "Server error while placing order",
                error: "Unknown error occurred",
            });
        }
    }
};

export const GetOrders = async (req: IRequest, res: Response) => {
    try {
        const userId = req.userId;

        if (!userId) {
            return res.status(401).json({ message: "Unauthorized access" });
        }

        const orders = await OrderModel.find({ authorID: userId }).sort({
            date: -1,
        });

        return res.status(200).json({ orders });
    } catch (error) {
        console.error("Order Fetching Error:", error);

        if (error instanceof Error) {
            return res.status(500).json({
                message: "Server error while getting orders",
                error: error.message,
            });
        } else {
            return res.status(500).json({
                message: "Server error while getting orders",
                error: "Unknown error occurred",
            });
        }
    }
};
