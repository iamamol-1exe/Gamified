import mongoose from "mongoose";

export interface Auser {
  fullname: string;
  email: string;
  password: string;
  generateAuthToken(): string;
  hashPassword(password: string): Promise<string>;
}
