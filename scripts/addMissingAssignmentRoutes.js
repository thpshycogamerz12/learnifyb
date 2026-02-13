import fs from 'fs';

const addMissingAssignmentRoutes = () => {
  console.log("🛠️ ADDING MISSING ASSIGNMENT ROUTES");
  console.log("===================================");
  
  const assignmentRoutePath = './routes/assignmentRoute.js';
  const content = fs.readFileSync(assignmentRoutePath, 'utf8');
  
  // Add missing routes before export
  const additionalRoutes = `
// Get all assignments for logged-in user (both educator and student)
router.get("/my", isAuth, async (req, res) => {
  try {
    const Assignment = require("../models/assignmentModel.js").default;
    
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

// Get assignment by ID (fix for frontend calls)
router.get("/assignments/:assignmentId", isAuth, async (req, res) => {
  try {
    const Assignment = require("../models/assignmentModel.js").default;
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
`;
  
  // Insert before export default router
  const fixedContent = content.replace(
    'export default router;',
    additionalRoutes + '\n\nexport default router;'
  );
  
  fs.writeFileSync(assignmentRoutePath, fixedContent);
  
  console.log("✅ Added missing assignment routes:");
  console.log("  - GET /my (user's assignments)");
  console.log("  - GET /assignments/:assignmentId (assignment by ID)");
  console.log("🎯 Frontend calls will now work!");
  console.log("===================================");
};

addMissingAssignmentRoutes();
