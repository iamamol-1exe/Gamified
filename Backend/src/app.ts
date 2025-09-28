import express, { type Request, type Response } from "express";
import cors from "cors";
import path from "path";
import dotenv from "dotenv";
import userRouter from "./routes/user.routes";
import teacherRouter from "./routes/teacher.routes";
import adminRouter from "./routes/admin.routes";
import cookieParser from "cookie-parser";

const app = express();

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
      if (allowedDomains.includes(origin) || origin.includes(".vercel.app")) {
        return callback(null, true);
      }

      return callback(new Error("Not allowed by CORS"));
    },
    credentials: true,
  })
);
app.use(cookieParser());

dotenv.config({ path: path.resolve(__dirname, "../.env") });

app.use(express.urlencoded({ extended: true, limit: "10mb" }));
app.use(express.json());

app.get("/health", (req: Request, res: Response) => {
  res.send("Server is Running ");
});

app.use("/user/api", userRouter);
app.use("/teacher/api", teacherRouter);
app.use("/admin/api", adminRouter);

export default app;
