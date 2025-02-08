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
exports.AuthCheck = exports.UserLogin = exports.UserSignUp = void 0;
const UserModel_1 = __importDefault(require("../models/UserModel"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const saltRounds = 10;
// SignUp Controller
const UserSignUp = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { username, email, password } = req.body;
    const user = yield UserModel_1.default.findOne({ email });
    if (user) {
        return res.status(409).json({ message: "User already exists" });
    }
    const hash = yield bcrypt_1.default.hash(password, saltRounds);
    const newUser = new UserModel_1.default({
        username,
        email,
        password: hash,
    });
    try {
        const savedUser = yield newUser.save();
        res.status(201).json({ message: "Account Created Successfully", user: savedUser });
    }
    catch (error) {
        res.status(500).json({ message: "Server Error", error });
    }
});
exports.UserSignUp = UserSignUp;
// Login Controller
const UserLogin = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    // Find the user in the database by email
    const user = yield UserModel_1.default.findOne({ email });
    if (!user) {
        return res.status(404).json({ message: "User Not Found" });
    }
    // Compare the password with the hashed password
    const isMatch = yield bcrypt_1.default.compare(password, user.password);
    if (!isMatch) {
        return res.status(400).json({ message: "Invalid password" });
    }
    // Generate a JWT token
    const token = jsonwebtoken_1.default.sign({ _id: user._id, email: user.email, username: user.username }, process.env.JWT_SECRET_KEY, { expiresIn: '1d' } // token expires in 1 day
    );
    // Set the token as an HttpOnly cookie
    res.cookie('HToken', token, {
        expires: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000), // 5 days expiration
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production', // Set 'secure' flag for production environment
        sameSite: 'lax', // Allow cookies to be sent with cross-site requests in a safe manner
    });
    // Respond with success message and user data (optional)
    res.status(200).json({ message: 'Successfully logged in', user: user });
});
exports.UserLogin = UserLogin;
const AuthCheck = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const token = req.cookies.HToken;
        if (!token) {
            return res.status(401).json({ isAuthenticated: false, message: "No token provided" });
        }
        if (!process.env.JWT_SECRET_KEY) {
            console.error("Error: JWT_SECRET_KEY is missing in .env file!");
            return res.status(500).json({ message: "Server Error: Missing JWT Secret Key" });
        }
        const decoded = jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET_KEY);
        return res.status(200).json({
            isAuthenticated: true,
            user: decoded
        });
    }
    catch (error) {
        console.error("Error in AuthCheck:", error);
        return res.status(401).json({ isAuthenticated: false, message: "Invalid or expired token" });
    }
});
exports.AuthCheck = AuthCheck;
