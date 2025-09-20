import mongoose from "mongoose";

export interface Tuser extends mongoose.Document {
  fullname: string;
  email: string;
  password: string;
  schoolName: string;
  generateAuthToken(): string;
  hashPassword(password: string): Promise<string>;
}
