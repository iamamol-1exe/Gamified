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
  comparePassword(password: string): Promise<boolean>;
}

export interface IUserType {
  _id?: string;
  fullname: string;
  email: string;
  password: string;
  socketId?: string;
  class: string;
  mobileNo?: number;
  rollNo: string;
  points: {
    totalPoints: number;
    science: number;
    technology: number;
    environment: number;
    math: number;
  };
  badges: any[];
  streaks: {
    testSolved: {
      science: number;
      technology: number;
      environment: number;
      math: number;
    };
    maxDays: number;
    currentStreak: number;
  };
  schoolName?: string;
  userType: string;
}
