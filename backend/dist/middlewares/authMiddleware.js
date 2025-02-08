"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authMiddleware = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const authMiddleware = (req, res, next) => {
    try {
        const token = req.cookies.HToken;
        if (!token) {
            res.status(401).json({ message: "Unauthorized. Please log in." });
            return;
        }
        const decoded = jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET_KEY);
        req.userId = decoded._id; // Assign the user ID from the decoded JWT token
        next();
    }
    catch (error) {
        res.status(401).json({ message: "Invalid token. Please log in again." });
    }
};
exports.authMiddleware = authMiddleware;
