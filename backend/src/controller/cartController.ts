import { Request, Response } from 'express';
import CartModel from '../models/CartModel';
import { Schema } from 'mongoose';

export const addToCart = async (req: Request, res: Response) => {
    try {
        console.log('Incoming Request Data:', req.body);

        const { userID, productID, quantity, size } = req.body;

        if (!userID || !productID) {
            return res.status(400).json({
                success: false,
                message: 'userID and productID are required',
            });
        }

        const selectedSize = size || 'N/A';

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
  