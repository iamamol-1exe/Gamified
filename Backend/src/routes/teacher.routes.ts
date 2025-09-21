import express from "express";
import {
  logoutTeacherController,
  registerTeacher,
  teacherLoginController,
  teacherProfileController,
} from "../controllers/teacher.controller";
import { authenticateTeacher } from "../middleware/authMiddleware";

const { body } = require("express-validator");

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
    body("school")
      .trim()
      .isLength({ min: 3 })
      .withMessage("school must be at least 3 characters"),
    body("userType")
      .trim()
      .isLength({ min: 3 })
      .withMessage("userType must be at least 3 characters"),
  ],
  registerTeacher
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
  teacherLoginController
);

router.get("/logout", authenticateTeacher, logoutTeacherController);

router.get("/profile", authenticateTeacher, teacherProfileController);

export default router;
