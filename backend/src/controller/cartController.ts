import { Request, Response } from 'express';
import CartModel from '../models/CartModel';
import { Schema } from 'mongoose';

export interface IRequest extends Request {
    userId?: Schema.Types.ObjectId;
}

export const addToCart = async (req: IRequest, res: Response) => {
    try {
        const { productID, quantity, size, price, image, name } = req.body;
        const userId = req.userId;

        if (!userId || !productID || price === undefined) {
            return res.status(400).json({
                success: false,
                message: 'userID, productID, and price are required',
            });
        }

        const selectedSize = size || 'N/A';
        const productQuantity = quantity || 1;

        let cart = await CartModel.findOne({ authorID: userId });

        if (!cart) {
            cart = new CartModel({
                authorID: userId,
                products: [
                    {
                        productId: productID,
                        quantity: productQuantity,
                        size: selectedSize,
                        price: price,
                        image: image,
                        name: name,
                    },
                ],
            });
        } else {
            const productIndex = cart.products.findIndex(
                (item) => item.productId === productID && item.size === selectedSize
            );

            if (productIndex > -1) {
                cart.products[productIndex].quantity += productQuantity;
            } else {
                cart.products.push({
                    productId: productID,
                    quantity: productQuantity,
                    size: selectedSize,
                    price: price,
                    image: image,
                    name: name,
                });
            }
        }

        await cart.save();

        const addedProduct = cart.products.find(
            (item) => item.productId === productID && item.size === selectedSize
        );

        return res.status(200).json({
            success: true,
            message: 'Product added to cart',
            product: {
                productId: addedProduct?.productId,
                quantity: addedProduct?.quantity,
                size: addedProduct?.size,
                price: addedProduct?.price,
                image: image,
                name: name,
            },
        });

    } catch (error) {
        console.error('Error adding to cart:', error);
        return res.status(500).json({
            success: false,
            message: 'Internal Server Error',
        });
    }
};


export interface IRequest extends Request {
    userId?: Schema.Types.ObjectId;
}

export const getCarts = async (req: IRequest, res: Response) => {
    try {
        const userId = req.userId;

        if (!userId) {
            return res.status(401).json({ message: "User not found. Please log in." });
        }

        const carts = await CartModel.find({ authorID: userId });

        if (!carts || carts.length === 0) {
            return res.status(404).json({ message: "No carts found for the user." });
        }

        const products = carts.flatMap(cart => cart.products);

        return res.status(200).json({
            success: true,
            products,
        });

    } catch (error) {
        console.error("Error fetching cart:", error);
        return res.status(500).json({
            success: false,
            message: "Internal Server Error",
        });
    }
};

export const decreaseCartsQuantity = async (req: IRequest, res: Response) => {
    try {
        const userId = req.userId;
        const { productId } = req.body;

        const cart = await CartModel.findOne({ authorID: userId });

        if (!cart) return res.status(404).json({ message: 'Cart not found' });

        const productIndex = cart.products.findIndex(p => p.productId.toString() === productId);

        if (productIndex === -1) return res.status(404).json({ message: 'Product not found in cart' });

        if (cart.products[productIndex].quantity > 1) {
            cart.products[productIndex].quantity -= 1;
        } else {
            cart.products.splice(productIndex, 1);
        }

        await cart.save();
        res.json({ message: 'Quantity updated', cart });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};

export const increaseCartsQuantity = async (req: IRequest, res: Response) => {
    try {
        const userId = req.userId; // Extract user ID from request
        const { productId } = req.body;
        console.log(req.body)

        const cart = await CartModel.findOne({ authorID: userId });

        if (!cart) return res.status(404).json({ message: 'Cart not found' });

        const product = cart.products.find(p => p.productId.toString() === productId);

        if (!product) return res.status(404).json({ message: 'Product not found in cart' });

        product.quantity += 1;

        await cart.save();
        res.json({ message: 'Quantity increased', cart });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};


export const RemoveCart = async (req: IRequest, res: Response) => {
    try {
        const userId = req.userId; // Extract user ID from request
        const { productId } = req.body;

        const cart = await CartModel.findOne({ authorID: userId });

        if (!cart) return res.status(404).json({ message: 'Cart not found' });

        cart.products = cart.products.filter(p => p.productId.toString() !== productId);

        await cart.save();
        res.json({ message: 'Product removed from cart', cart });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};
