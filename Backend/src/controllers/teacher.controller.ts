import { Request, Response } from "express";
import teacherModel from "../model/teacher.model";
import { createTeacher } from "../services/teacherService";
import { Tuser } from "../types/teacherTypes";
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
