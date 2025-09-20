import express, { type Request, type Response } from "express";
import cors from "cors";
import path from "path";
import dotenv from "dotenv";
import userRouter from "./routes/user.routes";

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

app.use("/user/api",userRouter);

export default app;
