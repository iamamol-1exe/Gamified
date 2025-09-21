import { Request, Response } from "express";
import teacherModel from "../model/teacher.model";
import { createTeacher } from "../services/teacherService";
import { Tuser } from "../types/teacherTypes";
import blackListModel from "../model/blacklistToken.model";
const { validationResult } = require("express-validator");

export const registerTeacher = async (req: Request, res: Response) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(201).json({ error: errors });
  }
  try {
    const { email, fullname, password, school, userType } = req.body;
    if (!fullname || !email || !password || !school || !userType) {
      return res.status(400).json({ error: "All fields are required" });
    }
    const hashedPassword = await teacherModel.prototype.hashPassword(password);
    const user = (await createTeacher(
      fullname,
      email,
      hashedPassword,
      school,
      userType
    )) as unknown as Tuser;
    if (!user) {
      return res.status(500).json({ error: "User creation failed" });
    }
    const token = user.generateAuthToken();
    res.status(200).json({ token, user });
  } catch (err) {
    console.error("Error while register Teacher", err);
    return res.status(401).json({ message: "Error while register Teacher" });
  }
};

export const teacherLoginController = async (req: Request, res: Response) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(201).json({ error: errors });
  }
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ error: "All fields are required" });
    }
    // Find user by email only (not by password as it's hashed)
    const user = (await teacherModel.findOne({ email: email })) as Tuser;

    if (!user) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    const isMatch = await user.comparePassword(password);

    if (!isMatch) {
      return res.status(400).json({ message: "Invalid email or password" });
    }
    const token = user.generateAuthToken();
    res.cookie("token", token);
    res.status(200).json({ token, user });
  } catch (err) {
    console.error("Error while logging user", err);
    return res.status(401).json({ message: "Error while logging user" });
  }
};

export const logoutTeacherController = async (req: Request, res: Response) => {
  try {
    const authHeader = req.headers.authorization;
    const token =
      req.cookies?.token ||
      (authHeader?.startsWith("Bearer ") ? authHeader.split(" ")[1] : null);
    if (!token) {
      return res.status(400).json({ message: "No token provided" });
    }

    try {
      // Blacklist the token if it doesn't already exist
      const existingToken = await blackListModel.findOne({ token });

      if (!existingToken) {
        await blackListModel.create({ token });
      }

      // Clear the cookie with same options used during login
      res.clearCookie("token", {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        path: "/", // must match cookie set path
      });

      return res.status(200).json({ message: "User logged out successfully" });
    } catch (dbError) {
      console.error("Database error during logout:", dbError);

      // Still clear cookie even if DB fails
      res.clearCookie("token", {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        path: "/",
      });

      return res.status(200).json({
        message: "Teacher logged out but token may not be blacklisted",
      });
    }
  } catch (error) {
    console.error("Error during logout:", error);
    return res.status(500).json({ message: "Logout failed" });
  }
};

export const teacherProfileController = async (req: Request, res: Response) => {
  res.status(200).json({ user: req.user });
};
