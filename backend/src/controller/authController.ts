import { Request, Response } from 'express';
import User from '../models/UserModel';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();

const saltRounds = 10;

// SignUp Controller
export const UserSignUp = async (req: Request, res: Response) => {
    const { username, email, password } = req.body;

    const user = await User.findOne({ email });

    if (user) {
        return res.status(409).json({ message: "User already exists" });
    }

    const hash = await bcrypt.hash(password, saltRounds);

    const newUser = new User({
        username,
        email,
        password: hash,
    });

    try {
        const savedUser = await newUser.save();
        res.status(201).json({ message: "Account Created Successfully", user: savedUser });
    } catch (error) {
        res.status(500).json({ message: "Server Error", error });
    }
};

// Login Controller
export const UserLogin = async (req: Request, res: Response) => {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
        return res.status(404).json({ message: "User Not Found" });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
        return res.status(400).json({ message: "Invalid password" });
    }

    const token = jwt.sign({ id: user._id, email: user.email, username: user.username }, process.env.JWT_SECRET_KEY!, { expiresIn: '1d' });  // Token expires in 1 day

    res.cookie('HToken', token, {
        expires: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000),  // Set expiry to 5 days
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',  // Use HTTPS in production, local should be false
        sameSite: 'none',  // Required for cross-origin requests
    });
    res.status(200).json({ message: 'Successfully logged in', user: user });
};

// Authentication Check Controller
export const AuthCheck = async (req: Request, res: Response) => {
    try {
        const token = req.cookies.HToken;

        if (!token) {
            return res.status(401).json({ isAuthenticated: false, message: "No token provided" });
        }


        if (!process.env.JWT_SECRET_KEY) {
            console.error("Error: JWT_SECRET_KEY is missing in .env file!");
            return res.status(500).json({ message: "Server Error: Missing JWT Secret Key" });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY as string);

        return res.status(200).json({
            isAuthenticated: true,
            user: decoded
        });

    } catch (error) {
        console.error("Error in AuthCheck:", error);
        return res.status(401).json({ isAuthenticated: false, message: "Invalid or expired token" });
    }
};