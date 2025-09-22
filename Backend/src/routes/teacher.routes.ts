import express from "express";
import {
  logoutTeacherController,
  registerTeacher,
  teacherLoginController,
  teacherProfileController,
} from "../controllers/teacher.controller";
import { authenticateTeacher } from "../middleware/authMiddleware";
import { addQuestionsController } from "../controllers/admin.controller";

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

router.post(
  "/addQuestions",
  [
    body("question")
      .isLength({ min: 3 })
      .withMessage("question must be at least 3 characters"),
    body("option1")
      .isLength({ min: 3 })
      .withMessage("option must be at least 3 characters"),
    body("option2")
      .isLength({ min: 3 })
      .withMessage("option must be at least 3 characters"),
    body("option3")
      .isLength({ min: 3 })
      .withMessage("option must be at least 3 characters"),
    body("option4")
      .isLength({ min: 3 })
      .withMessage("option must be at least 3 characters"),
    body("subject")
      .isLength({ min: 3 })
      .withMessage("subject must be at least 3 characters"),
    body("answer")
      .isLength({ min: 3 })
      .withMessage("subject must be at least 3 characters"),
  ],
  authenticateTeacher,
  addQuestionsController
);

router.get("/logout", authenticateTeacher, logoutTeacherController);

router.get("/profile", authenticateTeacher, teacherProfileController);

export default router;
