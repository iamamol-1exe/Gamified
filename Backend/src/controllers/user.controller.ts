import { error } from "console";
import { Request, Response } from "express";
import userModel from "../model/user.model";

import { createUser } from "../services/userService";
import { IUser } from "../types/userTypes";
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
