import { error } from "console";
import { Request, Response } from "express";
import userModel from "../model/user.model";

import { createUser } from "../services/userService";
import { IUser, IUserType } from "../types/userTypes";
import blackListModel from "../model/blacklistToken.model";
import questionModel from "../model/questions.model";
import { parseMultipleQuestions } from "../utils/parseQuestions";
const { validationResult } = require("express-validator");

export const userController = async (req: Request, res: Response) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(201).json({ error: errors });
  }
  try {
    const { fullname, email, password, school, rollno, standard, userType } =
      req.body;
    if (
      !fullname ||
      !email ||
      !password ||
      !school ||
      !rollno ||
      !standard ||
      !userType
    ) {
      return res.status(400).json({ error: "All fields are required" });
    }

    const hashedPassword = await userModel.prototype.hashPassword(password);
    const user = (await createUser(
      fullname,
      email,
      hashedPassword,
      school,
      rollno,
      standard,
      userType
    )) as unknown as IUser;
    if (!user) {
      return res.status(500).json({ error: "User creation failed" });
    }
    const token = user.generateAuthToken();
    res.status(200).json({ token, user });
  } catch (err) {
    console.error("error while registring user", err);
    return res.status(500).json({ error: "User creation failed" });
  }
};

export const userLoginController = async (req: Request, res: Response) => {
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
    const user = (await userModel.findOne({ email: email })) as IUser;

    if (!user) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    // Compare the provided password with the hashed password in database
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

export const logoutUserController = async (req: Request, res: Response) => {
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
        message: "User logged out but token may not be blacklisted",
      });
    }
  } catch (error) {
    console.error("Error during logout:", error);
    return res.status(500).json({ message: "Logout failed" });
  }
};

export const userProfileController = async (req: Request, res: Response) => {
  res.status(200).json({ user: req.user });
};

export const getQuestionsController = async (req: Request, res: Response) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(401).json({ errors: errors });
  }
  try {
    const { standard, subject } = req.body;
    const questions = await questionModel.find({
      standard: standard,
      subject: subject,
    });
    if (!questions) {
      return res
        .status(404)
        .json({ message: "No questions found for this standard and subject" });
    }

    const parsedQuestions = parseMultipleQuestions(questions);
    return res.status(200).json({ parsedQuestions });
  } catch (err) {
    console.error("Error while getting questions", err);
    return res.status(401).json({ message: "Error while getting questions" });
  }
};

export const updateUserController = async (req: Request, res: Response) => {
  try {
    const userData: IUserType = req.body;
    if (!userData || !userData._id) {
      return res.status(400).json({ message: "Invalid user data provided" });
    }

    // Use proper findByIdAndUpdate with options
    const updatedUser = await userModel.findByIdAndUpdate(
      userData._id,
      { $set: userData },
      { new: true, runValidators: true }
    );

    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    return res.status(200).json({
      message: "User updated successfully",
      user: updatedUser,
    });
  } catch (err) {
    console.error("Error while updating the User", err);
    return res.status(401).json({ message: "Error while updating the User" });
  }
};
