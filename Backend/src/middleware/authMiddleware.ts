import { NextFunction, Request, Response } from "express";
import blackListModel from "../model/blacklistToken.model";
import jwt from "jsonwebtoken";
import userModel from "../model/user.model";
import adminModel from "../model/admin.model";
import teacherModel from "../model/teacher.model";

// Extend Express Request interface
declare global {
  namespace Express {
    interface Request {
      user?: any;
    }
  }
}

export const authenticate = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const authHeader = req.headers.authorization;
    const token =
      req.cookies?.token ||
      (authHeader?.startsWith("Bearer ") ? authHeader.split(" ")[1] : null);

    console.log("Extracted token:", token);

    if (!token) {
      console.warn("No token found in cookie or header");
      return res.status(401).json({ message: "Unauthorized - No token" });
    }

    // ✅ token is guaranteed defined here
    const isBlacklisted = await blackListModel.findOne({ token });
    if (isBlacklisted) {
      return res
        .status(401)
        .json({ message: "Unauthorized - Token is blacklisted" });
    }

    const secret = process.env.JWT_SECRET || "amold";
    const decoded = jwt.verify(token, secret) as jwt.JwtPayload;

    const user = await userModel.findById(decoded.id).select("-password");
    if (!user) {
      return res.status(401).json({ message: "Unauthorized - User not found" });
    }

    req.user = user;
    next();
  } catch (err) {
    console.error("Auth error:", err);
    return res.status(401).json({ message: "Unauthorized" });
  }
};

export const authenticateAdmin = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const authHeader = req.headers.authorization;
    const token =
      req.cookies?.token ||
      (authHeader?.startsWith("Bearer ") ? authHeader.split(" ")[1] : null);

    console.log("Extracted token:", token);

    if (!token) {
      console.warn("No token found in cookie or header");
      return res.status(401).json({ message: "Unauthorized - No token" });
    }

    // ✅ token is guaranteed defined here
    const isBlacklisted = await blackListModel.findOne({ token });
    if (isBlacklisted) {
      return res
        .status(401)
        .json({ message: "Unauthorized - Token is blacklisted" });
    }

    const secret = process.env.JWT_SECRET || "amold";
    const decoded = jwt.verify(token, secret) as jwt.JwtPayload;

    const user = await adminModel.findById(decoded.id).select("-password");
    if (!user) {
      return res.status(401).json({ message: "Unauthorized - User not found" });
    }

    req.user = user;
    next();
  } catch (err) {
    console.error("Auth error:", err);
    return res.status(401).json({ message: "Unauthorized" });
  }
};

export const authenticateTeacher = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const authHeader = req.headers.authorization;
    const token =
      req.cookies?.token ||
      (authHeader?.startsWith("Bearer ") ? authHeader.split(" ")[1] : null);

    console.log("Extracted token:", token);

    if (!token) {
      console.warn("No token found in cookie or header");
      return res.status(401).json({ message: "Unauthorized - No token" });
    }

    // ✅ token is guaranteed defined here
    const isBlacklisted = await blackListModel.findOne({ token });
    if (isBlacklisted) {
      return res
        .status(401)
        .json({ message: "Unauthorized - Token is blacklisted" });
    }

    const secret = process.env.JWT_SECRET || "amold";
    const decoded = jwt.verify(token, secret) as jwt.JwtPayload;

    const user = await teacherModel.findById(decoded.id).select("-password");
    if (!user) {
      return res.status(401).json({ message: "Unauthorized - User not found" });
    }

    req.user = user;
    next();
  } catch (err) {
    console.error("Auth error:", err);
    return res.status(401).json({ message: "Unauthorized" });
  }
};
