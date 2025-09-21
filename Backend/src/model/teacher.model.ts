import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
const teacherSchema = new mongoose.Schema({
  fullname: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  schoolName: {
    type: String,
    required: true,
  },
  userType: {
    type: String,

    requiredd: true,
  },
});

teacherSchema.methods.generateAuthToken = function () {
  const secret: string = process.env.JWT_Secret || "amold";
  return jwt.sign({ id: this.id }, secret);
};

teacherSchema.methods.comparePassword = async function (password: string) {
  return await bcrypt.compare(password, this.password);
};

teacherSchema.methods.hashPassword = async function (password: string) {
  return await bcrypt.hash(password, 10);
};

const teacherModel = mongoose.model("teacher", teacherSchema);

export default teacherModel;
