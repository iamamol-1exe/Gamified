import { error } from "console";
import { Request, Response } from "express";
import userModel from "../model/user.model";
import { IUser } from "../model/user.model";
import { createUser } from "../services/userService";
const { validationResult } = require("express-validator");

export const userController = async (req: Request, res: Response) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(201).json({ error: errors });
  }
  try {
    const { fullname, email, password, school, rollno, standard } = req.body;
    if (!fullname || !email || !password || !school || !rollno || !standard) {
      return res.status(400).json({ error: "All fields are required" });
    }

    const hashedPassword = await userModel.prototype.hashPassword(password);
    const user = (await createUser(
      fullname,
      email,
      hashedPassword,
      school,
      rollno,
      standard
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

export const userLoginController = (req: Request, res: Response) => {};
