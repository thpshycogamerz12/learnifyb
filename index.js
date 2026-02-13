import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
import connectDb from "./configs/db.js";

// Routes
import authRouter from "./routes/authRoute.js";
import userRouter from "./routes/userRoute.js";
import courseRouter from "./routes/courseRoute.js";
import paymentRouter from "./routes/paymentRoute.js";
import aiRoute from "./routes/aiRoute.js";
import noteRoute from "./routes/noteRoute.js";
import assignmentRoute from "./routes/assignmentRoute.js";
import reviewRouter from "./routes/reviewRoute.js";
import progressRoutes from "./routes/progressRoutes.js";
import certificateRoutes from "./routes/certificateRoutes.js";
import adminRoute from "./routes/adminRoute.js";
import courseNoteRoute from "./routes/courseNoteRoute.js";
import attendanceRoute from "./routes/attendanceRoute.js";
import notificationRoute from "./routes/notificationRoute.js";
import setupRoute from "./routes/setupRoute.js";
import testRoute from "./routes/testRoute.js";
import liveClassRoute from "./routes/liveClassRoute.js";
import gradeRoute from "./routes/gradeRoute.js";
import doubtRoute from "./routes/doubtRoute.js";

dotenv.config({ path: "./.env" });

const app = express();
const port = process.env.PORT || 8000;

// ================= MIDDLEWARES =================

app.use(express.json());
app.use(cookieParser());

// ✅ SAFE CORS (Node v22 compatible)
app.use(
  cors({
    origin: (origin, callback) => {
      const allowedOrigins = [
        "https://learnifyf.onrender.com"
      ];

      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization", "X-Requested-With"],
    exposedHeaders: ["Set-Cookie"]
  })
);


// Health Check Route
app.get("/api/", (req, res) => {
  res.json({ 
    status: "OK", 
    message: "Learnify Backend is running",
    timestamp: new Date().toISOString()
  });
});

// ================= ROUTES =================

app.use("/api/auth", authRouter);
app.use("/api/user", userRouter);
app.use("/api/course", courseRouter);
app.use("/api/payment", paymentRouter);
app.use("/api/ai", aiRoute);
app.use("/api/review", reviewRouter);
app.use("/api/progress", progressRoutes);
app.use("/api/cert", certificateRoutes);
app.use("/api/admin", adminRoute);
app.use("/api/sharednotes", courseNoteRoute);
app.use("/api/attendance", attendanceRoute);
app.use("/api/notes", noteRoute);
app.use("/api/assignments", assignmentRoute);
app.use("/api/notifications", notificationRoute);
app.use("/api/setup", setupRoute);
app.use("/api/test", testRoute);
app.use("/api/liveclass", liveClassRoute);
app.use("/api/grades", gradeRoute);
app.use("/api/doubts", doubtRoute);

// ================= TEST ROUTE =================

app.get("/", (req, res) => {
  res.send("✅ Server Running Successfully");
});

// ================= ERROR HANDLER =================

app.use((err, req, res, next) => {
  console.error("❌ Error:", err.message);
  res.status(500).json({
    message: "Internal server error",
    error:
      process.env.NODE_ENV === "development"
        ? err.message
        : "Something went wrong"
  });
});

// ================= SERVER + DB =================

app.listen(port, async () => {
  console.log(`🔥 Server started on port ${port}`);
  console.log(
    "🔑 GEMINI_API_KEY:",
    process.env.GEMINI_API_KEY ? "Set" : "Missing"
  );
  await connectDb();
});

// ================= SAFETY =================

process.on("uncaughtException", err => {
  console.error("❗ Uncaught Exception:", err);
  process.exit(1);
});

process.on("unhandledRejection", err => {
  console.error("❗ Unhandled Rejection:", err);
});
