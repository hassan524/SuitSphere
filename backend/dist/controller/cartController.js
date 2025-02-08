"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getCarts = exports.addToCart = void 0;
const CartModel_1 = __importDefault(require("../models/CartModel"));
// 🛠 Improved Error Handling and Debugging
const addToCart = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
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
        let cart = yield CartModel_1.default.findOne({ authorID: userID });
        if (!cart) {
            cart = new CartModel_1.default({
                authorID: userID,
                products: [
                    {
                        productId: productID,
                        quantity: quantity || 1,
                        size: selectedSize,
                    },
                ],
            });
        }
        else {
            const productIndex = cart.products.findIndex((item) => item.productId === productID && item.size === selectedSize);
            if (productIndex > -1) {
                cart.products[productIndex].quantity += quantity || 1;
            }
            else {
                cart.products.push({
                    productId: productID,
                    quantity: quantity || 1,
                    size: selectedSize,
                });
            }
        }
        yield cart.save();
        return res.status(200).json({
            success: true,
            message: 'Product added to cart',
            cart,
        });
    }
    catch (error) {
        console.error('Error adding to cart:', error);
        return res.status(500).json({
            success: false,
            message: 'Internal Server Error',
        });
    }
});
exports.addToCart = addToCart;
const getCarts = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = req.user;
        if (!user) {
            return res.status(401).json({ message: "User not found. Please log in." });
        }
        const cart = yield CartModel_1.default.findOne({ authorID: user.id });
        console.log(cart);
        if (!cart) {
            return res.status(404).json({ message: "Cart not found for the user." });
        }
        return res.status(200).json({
            success: true,
            cart: cart,
        });
    }
    catch (error) {
        console.error("Error fetching cart:", error);
        return res.status(500).json({
            success: false,
            message: "Internal Server Error",
        });
    }
});
exports.getCarts = getCarts;
