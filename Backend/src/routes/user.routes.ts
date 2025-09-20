import express from "express";
const { body } = require("express-validator");


const router = express.Router();

router.post("/register",[body("email").isEmail().trim()],

)