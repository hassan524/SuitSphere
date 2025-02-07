import { Request, Response } from 'express';
import CartModel from '../models/CartModel';

// 🛠 Improved Error Handling and Debugging
export const addToCart = async (req: Request, res: Response) => {
    try {
        console.log('Incoming Request Data:', req.body); // Debugging Log

        const { userID, productID, quantity, size } = req.body;

        if (!userID || !productID) {
            return res.status(400).json({
                success: false,
                message: 'userID and productID are required',
            });
        }

        const selectedSize = size || 'N/A';

        // Find user's cart
        let cart = await CartModel.findOne({ authorID: userID });

        if (!cart) {
            cart = new CartModel({
                authorID: userID,
                products: [
                    {
                        productId: productID,
                        quantity: quantity || 1,
                        size: selectedSize,
                    },
                ],
            });
        } else {
            const productIndex = cart.products.findIndex(
                (item) => item.productId === productID && item.size === selectedSize
            );

            if (productIndex > -1) {
                cart.products[productIndex].quantity += quantity || 1;
            } else {
                cart.products.push({
                    productId: productID,
                    quantity: quantity || 1,
                    size: selectedSize,
                });
            }
        }

        await cart.save();
        return res.status(200).json({
            success: true,
            message: 'Product added to cart',
            cart,
        });
    } catch (error) {
        console.error('Error adding to cart:', error);
        return res.status(500).json({
            success: false,
            message: 'Internal Server Error',
        });
    }
};
