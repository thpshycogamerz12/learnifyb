import express from "express";
import isAuth from "../middlewares/isAuth.js";
import upload from "../middlewares/multer.js";
import Assignment from "../models/assignmentModel.js";
import {
  createAssignment,
  getAssignmentsByCourse,
  updateAssignment,
  deleteAssignment,
  submitAssignment,
  getMySubmission,
  getSubmissionsForAssignment,
  gradeSubmission,
} from "../controllers/assignmentController.js";

const router = express.Router();

router.use(isAuth);

// Get all assignments for logged-in user (both educator and student)
router.get("/my", async (req, res) => {
  try {
    const assignments = await Assignment.find({ 
      $or: [
        { educatorId: req.userId },
        { assignedTo: req.userId }
      ]
    }).populate('courseId', 'title')
      .populate('assignedTo', 'name email')
      .sort({ createdAt: -1 });
    
    res.json({
      success: true,
      message: "My assignments loaded successfully",
      data: assignments,
      count: assignments.length
    });
  } catch (error) {
    console.error("Error fetching my assignments:", error);
    res.status(500).json({
      success: false,
      message: "Failed to load assignments",
      error: error.message
    });
  }
});

// Educator manages assignments
router.post("/", upload.single("attachment"), createAssignment);
router.patch("/:assignmentId", updateAssignment);
router.delete("/:assignmentId", deleteAssignment);

// List assignments for a course (students + educators)
router.get("/:courseId", getAssignmentsByCourse);

// Student submission
router.post("/:assignmentId/submit", upload.single("attachment"), submitAssignment);
router.get("/:assignmentId/my", getMySubmission);

// Educator views submissions and grades
router.get("/:assignmentId/submissions", getSubmissionsForAssignment);
router.post("/submissions/:submissionId/grade", gradeSubmission);

// Get assignment by ID (fix for frontend calls)
router.get("/assignments/:assignmentId", async (req, res) => {
  try {
    const { assignmentId } = req.params;
    
    const assignment = await Assignment.findById(assignmentId)
      .populate('courseId', 'title')
      .populate('educatorId', 'name email')
      .populate('assignedTo', 'name email');
    
    if (!assignment) {
      return res.status(404).json({
        success: false,
        message: "Assignment not found"
      });
    }
    
    res.json({
      success: true,
      message: "Assignment loaded successfully",
      data: assignment
    });
  } catch (error) {
    console.error("Error fetching assignment:", error);
    res.status(500).json({
      success: false,
      message: "Failed to load assignment",
      error: error.message
    });
  }
});


export default router;

