export interface IUser extends mongoose.Document {
  fullname: string;
  email: string;
  password: string;
  class: string;
  rollNo: string;
  schoolName: string;
  generateAuthToken(): string;
  hashPassword(password: string): Promise<string>;
}
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
    science: {
      type: Number,
    },
    technology: {
      type: Number,
    },
    enviroment: {
      type: Number,
    },
    math: {
      type: Number,
    },
  },
  bagdes: {
    type: Array,
  },
  streaks: {
    testSloved: {
      science: {
        type: Number,
      },
      technology: {
        type: Number,
      },
      enviroment: {
        type: Number,
      },
      math: {
        type: Number,
      },
    },
    maxDays: {
      type: Number,
    },
    currentStreak: {
      type: Number,
    },
  },
  schoolName: {
    type: String,
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
