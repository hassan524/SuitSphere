import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { Schema } from "mongoose";
dotenv.config();


export interface IRequest extends Request {
  userId?: Schema.Types.ObjectId;
}

export const authMiddleware = (req: IRequest, res: Response, next: NextFunction): void => {
  try {
    const token = req.cookies.HToken;

    if (!token) {
      res.status(401).json({ message: "Unauthorized. Please log in." });
      return;
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY as string) as jwt.JwtPayload; 
    console.log('this shit',decoded)

    if (!decoded._id) {
      res.status(401).json({ message: "Invalid token payload." });
      return;
    }

    req.userId = decoded._id as Schema.Types.ObjectId;

    next();
  } catch (error) {
    res.status(401).json({ message: "Invalid token. Please log in again." });
  }
};
