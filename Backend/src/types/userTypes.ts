import mongoose from "mongoose";
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
