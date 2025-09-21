import express from "express";
import {
  addQuestionsController,
  adminLoginController,
  adminProfileController,
  logoutAdminController,
  registerAdmin,
} from "../controllers/admin.controller";
import { authenticate, authenticateAdmin } from "../middleware/authMiddleware";

const { body } = require("express-validator");
const router = express.Router();

router.post(
  "/register",
  [
    body("fullname")
      .trim()
      .isLength({ min: 3 })
      .withMessage("Name must be at least 3 characters"),
    body("email").isEmail().trim(),
    body("password")
      .isLength({ min: 3 })
      .withMessage("password must be at least 3 characters"),
  ],
  registerAdmin
);

router.post(
  "/login",
  [
    body("email").isEmail().trim(),
    body("password")
      .isLength({ min: 3 })
      .withMessage("password must be at least 3 characters"),
  ],
  adminLoginController
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
  authenticate,
  addQuestionsController
);

router.get("/logout", authenticateAdmin, logoutAdminController);
4;

router.get("/profile", authenticateAdmin, adminProfileController);

export default router;
