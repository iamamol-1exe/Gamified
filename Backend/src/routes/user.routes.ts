import express from "express";
const { body } = require("express-validator");
import {
  getQuestionsController,
  logoutUserController,
  userController,
  userLoginController,
  userProfileController,
} from "../controllers/user.controller";
import { authenticate } from "../middleware/authMiddleware";
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
      .isLength({ min: 1 })
      .withMessage("standard must be at least 3 characters"),
    body("school")
      .trim()
      .isLength({ min: 3 })
      .withMessage("school must be at least 3 characters"),
    body("rollno")
      .trim()
      .isLength({ min: 1 })
      .withMessage("rollno must be at least 1 characters"),
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

router.get("/logout", authenticate, logoutUserController);

router.get("/profile", authenticate, userProfileController);

router.post(
  "/getQuestions",
  [
    body("standard")
      .isString()
      .isLength({ min: 3 })
      .withMessage("password must be at least 3 characters"),
    body("subject")
      .isString()
      .isLength({ min: 3 })
      .withMessage("password must be at least 3 characters"),
  ],
  authenticate,
  getQuestionsController  
);

export default router;
