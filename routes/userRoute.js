import express from "express";
import isAuth from "../middlewares/isAuth.js";
import optionalAuth from "../middlewares/optionalAuth.js";
import upload from "../middlewares/multer.js";

import { 
  getCurrentUser,
  UpdateProfile,
  getEnrolledCourses,
  getMyStudents,
  getStudentPerformance,
  updateActivity
} from "../controllers/userController.js";


let userRouter = express.Router();

// Get logged in user (optional auth to avoid 401 noise)
userRouter.get("/currentuser", optionalAuth, getCurrentUser);

// Update profile
userRouter.post("/updateprofile", isAuth, upload.single("photoUrl"), UpdateProfile);

// ⭐ Get enrolled courses
userRouter.get("/enrolled", isAuth, getEnrolledCourses);

// ⭐ Get student performance (educator only)
userRouter.get("/student/:studentId/performance", isAuth, getStudentPerformance);

// Educator: list students across own courses
userRouter.get("/mystudents", isAuth, getMyStudents);

// Activity tracking
userRouter.post("/activity", isAuth, updateActivity);


export default userRouter;
