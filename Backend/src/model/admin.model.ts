import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

const adminSchema = new mongoose.Schema({
  fullname: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  userType: {
    type: String,
  },
});

adminSchema.methods.generateAuthToken = function () {
  const secret: string = process.env.JWT_Secret || "amold";
  return jwt.sign({ id: this.id }, secret);
};

adminSchema.methods.comparePassword = async function (password: string) {
  return await bcrypt.compare(password, this.password);
};

adminSchema.methods.hashPassword = async function (password: string) {
  return await bcrypt.hash(password, 10);
};

const adminModel = mongoose.model("admin", adminSchema);

export default adminModel;
