import axios from "axios";

const testAssignmentRoutes = async () => {
  console.log("🧪 TESTING ASSIGNMENT ROUTES");
  console.log("=============================");
  
  try {
    // First login to get token
    console.log("\n🔐 Step 1: Login...");
    const loginResponse = await axios.post("https://learnifyb.onrender.com/api/auth/login", {
      email: "student1@gmail.com",
      password: "password123"
    }, {
      withCredentials: true
    });
    
    console.log("✅ Login successful");
    
    // Test the problematic assignment route
    console.log("\n📝 Step 2: Testing assignment routes...");
    
    const assignmentTests = [
      { 
        url: "https://learnifyb.onrender.com/api/assignments/my", 
        name: "My Assignments",
        description: "Get all assignments for user"
      },
      { 
        url: "https://learnifyb.onrender.com/api/assignments/6939884733f561235a6e5aed", 
        name: "Assignment by ID",
        description: "Get specific assignment"
      }
    ];
    
    for (const test of assignmentTests) {
      try {
        const response = await axios.get(test.url, {
          withCredentials: true
        });
        
        console.log(`✅ ${test.name}: Working`);
        console.log(`   Data: ${response.data?.data?.length || 0} items found`);
        
      } catch (error) {
        console.log(`❌ ${test.name}: ${error.response?.status}`);
        console.log(`   Error: ${error.response?.data?.message || error.message}`);
        
        if (error.response?.status === 404) {
          console.log("   🔧 This route was missing - now should be fixed!");
        }
      }
    }
    
    console.log("\n🎯 ASSIGNMENT ROUTE TEST COMPLETE");
    console.log("=============================");
    
  } catch (error) {
    console.error("❌ Test failed:", error.message);
  }
};

testAssignmentRoutes();
