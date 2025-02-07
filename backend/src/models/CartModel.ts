import mongoose, { Schema, Document } from 'mongoose';

export interface ICartProduct {
    productId: string;
    quantity: number;
    size: string; // Ensure size is stored
}

export interface ICart extends Document {
    authorID: string;
    products: ICartProduct[];
}

const CartSchema = new Schema<ICart>({
    authorID: {
        type: String,
        required: true,
    },
    products: [
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
            size: {
                type: String,
                required: true,
            },
        },
    ],
});

export default mongoose.model<ICart>('Cart', CartSchema);
