import fs from 'fs';

const fixAssignmentRoutes = () => {
  console.log("🛠️ FIXING ASSIGNMENT ROUTES");
  console.log("============================");
  
  // Check if assignment route exists
  const assignmentRoutePath = './routes/assignmentRoute.js';
  
  try {
    const assignmentContent = fs.readFileSync(assignmentRoutePath, 'utf8');
    console.log("✅ Assignment route file exists");
    console.log("📄 Content preview:", assignmentContent.substring(0, 200) + "...");
    
    // Check if the route structure is correct
    if (assignmentContent.includes('express.Router()')) {
      console.log("✅ Assignment route structure looks correct");
      
      // Check for specific assignment routes
      const hasGetAssignment = assignmentContent.includes('/assignments/:assignmentId');
      const hasGetMyAssignments = assignmentContent.includes('/my');
      const hasGetAssignmentByCourse = assignmentContent.includes('/course/:courseId');
      
      console.log("📊 Route Analysis:");
      console.log(`  - GET /assignments/:assignmentId: ${hasGetAssignment ? '✅' : '❌'}`);
      console.log(`  - GET /my: ${hasGetMyAssignments ? '✅' : '❌'}`);
      console.log(`  - GET /course/:courseId: ${hasGetAssignmentByCourse ? '✅' : '❌'}`);
      
      if (!hasGetMyAssignments) {
        console.log("🔧 Adding missing GET /my route...");
        
        const fixedContent = assignmentContent.replace(
          'let assignmentRouter = express.Router();',
          `let assignmentRouter = express.Router();

// Get my assignments
assignmentRouter.get("/my", isAuth, async (req, res) => {
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
      message: "Assignments loaded successfully",
      data: assignments,
      count: assignments.length
    });
  } catch (error) {
    console.error("Error fetching assignments:", error);
    res.status(500).json({
      success: false,
      message: "Failed to load assignments",
      error: error.message
    });
  }
});`
        );
        
        fs.writeFileSync(assignmentRoutePath, fixedContent);
        console.log("✅ Added GET /my route for assignments");
      }
      
    } else {
      console.log("❌ Assignment route file structure is incorrect");
    }
    
  } catch (error) {
    console.error("❌ Error reading assignment route:", error.message);
  }
  
  console.log("\n🎯 ASSIGNMENT ROUTE FIX COMPLETE");
  console.log("============================");
};

fixAssignmentRoutes();
