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
    const hashedPassword: string = adminModel.prototype.hashPassword(password);
    const admin = (await createAdmin(
      fullname,
      email,
      password,
      userType
    )) as unknown as Auser;
    if (!admin) {
      return res.status(500).json({ error: "User creation failed" });
    }
    const token = admin.generateAuthToken();
    res.status(200).json({ token, admin });
  } catch (err) {
    console.log("Error while registering admin", err);
    return res.status(401).json({ message: "Error while register Admin" });
  }
};
