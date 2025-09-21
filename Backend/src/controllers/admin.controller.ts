import { Request, Response } from "express";
import adminModel from "../model/admin.model";
import { createAdmin } from "../services/adminService";
import { Auser } from "../types/adminTypes";
const { validationResult } = require("express-validator");

export const registerAdmin = async (req: Request, res: Response) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(201).json({ error: errors });
  }
  try {
    const { email, fullname, password, userType } = req.body;
    if (!fullname || !email || !password || !userType) {
      return res.status(400).json({ error: "All fields are required" });
    }
    const hashedPassword: string = await adminModel.prototype.hashPassword(password);
    const user = (await createAdmin(
      fullname,
      email,
      hashedPassword,
      userType
    )) as unknown as Auser;
    if (!user) {
      return res.status(500).json({ error: "User creation failed" });
    }
    const token = user.generateAuthToken();
    res.status(200).json({ token, user });
  } catch (err) {
    console.log("Error while registering admin", err);
    return res.status(401).json({ message: "Error while register Admin" });
  }
};

export const adminLoginController = async (req: Request, res: Response) => {
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
    const user = (await adminModel.findOne({ email: email })) as Auser;

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
