import mongoose, { Schema, Document } from "mongoose";

// Order Interface
export interface IOrder {
    productId: string;
    quantity: number;
    price: number;
    image: string;
    name: string;
    size: string;
}

// Order Schema Interface
export interface IOrderDocument extends Document {
    authorID: string;
    address: string;
    carts: IOrder[];
    PaymentMethod: "Cash on Delivery" | "Stripe" | "Razorpay";
    date: Date;
}

// Order Schema
const OrderSchema = new Schema<IOrderDocument>({
    authorID: {
        type: String,
        required: true,
    },
    address: {
        type: String,
        required: true,
    },
    carts: [
        {
            productId: {
                type: String,
                required: true,
            },
            quantity: {
                type: Number,
                required: true,
                min: 1,
            },
            price: {
                type: Number,
                required: true,
            },
            image: {
                type: String,
                required: true,
            },
            name: {
                type: String,
                required: true,
            },
            size: {
                type: String,
                required: false,
            },
        },
    ],
    PaymentMethod: {
        type: String,
        required: true,
        enum: ["Cash on Delivery", "Stripe", "Razorpay"],
    },
    date: {
        type: Date,
        default: Date.now,
        expires: 86400, 
    },
});

export default mongoose.model<IOrderDocument>("Order", OrderSchema);
