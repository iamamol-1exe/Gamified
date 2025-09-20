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
    const teacher = (await createTeacher(
      fullname,
      email,
      password,
      school,
      userType
    )) as unknown as Tuser;
    if (!teacher) {
      return res.status(500).json({ error: "User creation failed" });
    }
    const token = teacher.generateAuthToken();
    res.status(200).json({ token, teacher });
  } catch (err) {
    console.error("Error while register Teacher", err);
    return res.status(401).json({ message: "Error while register Teacher" });
  }
};
