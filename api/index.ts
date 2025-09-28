import { VercelRequest, VercelResponse } from "@vercel/node";
import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import { connectDatabase } from "../Backend/src/config/database";
import userRouter from "../Backend/src/routes/user.routes";
import teacherRouter from "../Backend/src/routes/teacher.routes";
import adminRouter from "../Backend/src/routes/admin.routes";

// Load environment variables
dotenv.config();

// Initialize database connection
let dbConnected = false;
async function ensureDbConnection() {
  if (!dbConnected) {
    try {
      await connectDatabase();
      dbConnected = true;
    } catch (error) {
      console.error("Database connection failed:", error);
    }
  }
}

// Create Express app
const app = express();

// CORS configuration
const allowedDomains = process.env.CORS_ORIGIN?.split(",") || [
  "http://localhost:5173",
  "http://localhost:8080",
  "http://localhost:3000",
];

app.use(
  cors({
    origin: (origin, callback) => {
      // Allow requests with no origin (like mobile apps or curl requests)
      if (!origin) return callback(null, true);

      // Check if the origin is in the allowed domains or is a Vercel deployment
      if (
        allowedDomains.includes(origin) ||
        (origin && origin.includes(".vercel.app"))
      ) {
        return callback(null, true);
      }

      return callback(new Error("Not allowed by CORS"));
    },
    credentials: true,
  })
);

app.use(cookieParser());
app.use(express.urlencoded({ extended: true, limit: "10mb" }));
app.use(express.json());

// Health check
app.get("/health", (req, res) => {
  res.json({
    status: "Server is Running",
    timestamp: new Date().toISOString(),
  });
});

// Routes
app.use("/user/api", userRouter);
app.use("/teacher/api", teacherRouter);
app.use("/admin/api", adminRouter);

// Catch all route for undefined endpoints
app.use("*", (req, res) => {
  res.status(404).json({ error: "Endpoint not found" });
});

// Vercel serverless function handler
export default async function handler(req: VercelRequest, res: VercelResponse) {
  try {
    // Ensure database connection
    await ensureDbConnection();

    // Handle the request using Express app
    return app(req, res);
  } catch (error) {
    console.error("Handler error:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
}
