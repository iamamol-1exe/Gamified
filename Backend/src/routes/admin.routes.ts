import express from "express";
import { registerAdmin } from "../controllers/admin.controller";

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

export default router;
