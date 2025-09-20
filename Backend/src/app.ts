import express, { type Request, type Response } from "express";
import cors from "cors";
import path from "path";
import dotenv from "dotenv";
import userRouter from "./routes/user.routes";
import teacherRouter from "./routes/teacher.routes";
import adminRouter from "./routes/admin.routes";
const app = express();

const allowedDomains = [" ", "http://localhost:5173", "http://localhost:8080"];
app.use(
  cors({
    origin: allowedDomains,
  })
);

dotenv.config({ path: path.resolve(__dirname, "../.env") });

app.use(express.urlencoded({ extended: true, limit: "10mb" }));
app.use(express.json({ limit: "10mb" }));

app.get("/health", (req: Request, res: Response) => {
  res.send("Server is Running ");
});

app.use("/user/api", userRouter);
app.use("/teacher/api", teacherRouter);
app.use("/admin/api", adminRouter);

export default app;
