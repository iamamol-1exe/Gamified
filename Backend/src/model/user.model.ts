import { IUser } from "../types/userTypes";
import jwt from "jsonwebtoken";
import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const userSchema = new mongoose.Schema({
  fullname: { type: String, required: true },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  socketId: {
    type: String,
  },
  class: {
    type: String,
    required: true,
  },
  mobileNo: {
    type: Number,
  },
  rollNo: {
    type: String,
    required: true,
  },
  points: {
    totalPoints: {
      type: Number,
      default: 0,
    },
    science: {
      type: Number,
      default: 0,
    },
    technology: {
      type: Number,
      default: 0,
    },
    enviroment: {
      type: Number,
      default: 0,
    },
    math: {
      type: Number,
      default: 0,
    },
  },
  bagdes: {
    type: Array,
    default: [],
  },
  streaks: {
    testSloved: {
      science: {
        type: Number,
        default: 0,
      },
      technology: {
        type: Number,
        default: 0,
      },
      enviroment: {
        type: Number,
        default: 0,
      },
      math: {
        type: Number,
        default: 0,
      },
    },
    maxDays: {
      type: Number,
      default: 0,
    },
    currentStreak: {
      type: Number,
      default: 0,
    },
  },
  schoolName: {
    type: String,
  },
  userType: {
    type: String,
    required: true,
  },
});

userSchema.methods.generateAuthToken = function () {
  const secret: string = process.env.JWT_Secret || "amold";
  return jwt.sign({ id: this.id }, secret);
};
userSchema.methods.comparePassword = async function (password: string) {
  return await bcrypt.compare(password, this.password);
};
userSchema.methods.hashPassword = async function (password: string) {
  return await bcrypt.hash(password, 10);
};

const userModel = mongoose.model("user", userSchema);

export default userModel;
