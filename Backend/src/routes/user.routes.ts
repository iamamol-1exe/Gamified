import express from "express";
const { body } = require("express-validator");
import {
  userController,
  userLoginController,
} from "../controllers/user.controller";
const router = express.Router();

router.post(
  "/register",
  [
    body("email").isEmail().trim(),
    body("fullname")
      .trim()
      .isLength({ min: 3 })
      .withMessage("Name must be at least 3 characters"),
    body("password")
      .trim()
      .isLength({ min: 3 })
      .withMessage("password must be at least 3 characters"),
    body("standard")
      .trim()
      .isLength({ min: 3 })
      .withMessage("standard must be at least 3 characters"),
    body("school")
      .trim()
      .isLength({ min: 3 })
      .withMessage("school must be at least 3 characters"),
    body("rollno")
      .trim()
      .isLength({ min: 3 })
      .withMessage("rollno must be at least 3 characters"),
    body("userType")
      .trim()
      .isLength({ min: 3 })
      .withMessage("userType must be at least 3 characters"),
  ],
  userController
);

router.post(
  "/login",
  [
    body("email").isEmail().trim(),
    body("password")
      .trim()
      .isLength({ min: 3 })
      .withMessage("password must be at least 3 characters"),
  ],
  userLoginController
);

export default router;
