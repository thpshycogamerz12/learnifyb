import axios from "axios";

const comprehensiveDebug = async () => {
  console.log("🔍 COMPREHENSIVE DEBUGGING STARTED");
  console.log("=====================================");
  
  // Test 1: Basic Backend Connectivity
  console.log("\n📡 Test 1: Backend Connectivity");
  try {
    const response = await axios.get("https://learnifyb.onrender.com/api/");
    console.log("✅ Backend is reachable");
  } catch (error) {
    console.log("❌ Backend unreachable:", error.message);
  }

  // Test 2: Login with Multiple Users
  console.log("\n🔐 Test 2: Login with Different Users");
  const testUsers = [
    { email: "admin@learnify.com", password: "Admin@123" },
    { email: "student1@gmail.com", password: "password123" },
    { email: "himanshusagar103@gmail.com", password: "password" }
  ];

  for (const user of testUsers) {
    try {
      const response = await axios.post("https://learnifyb.onrender.com/api/auth/login", user, {
        withCredentials: true
      });
      console.log(`✅ ${user.email}: Login successful`);
      
      // Test 3: Protected Endpoints
      console.log(`\n🛡️ Test 3: Protected Endpoints for ${user.email}`);
      const endpoints = [
        "/api/user/currentuser",
        "/api/user/activity",
        "/api/attendance/my",
        "/api/sharednotes",
        "/api/notifications/my"
      ];

      for (const endpoint of endpoints) {
        try {
          const userResponse = await axios.get(`https://learnifyb.onrender.com${endpoint}`, {
            withCredentials: true
          });
          console.log(`✅ ${endpoint}: Working`);
        } catch (error) {
          console.log(`❌ ${endpoint}: ${error.response?.status} - ${error.response?.data?.message || error.message}`);
        }
      }
      
      break; // Stop after first successful login
    } catch (error) {
      console.log(`❌ ${user.email}: ${error.response?.status} - ${error.response?.data?.message || error.message}`);
    }
  }

  // Test 4: Frontend Routing
  console.log("\n🌐 Test 4: Frontend Routing");
  const frontendRoutes = [
    "https://learnifyf.onrender.com/",
    "https://learnifyf.onrender.com/login",
    "https://learnifyf.onrender.com/signup"
  ];

  for (const route of frontendRoutes) {
    try {
      const response = await axios.get(route);
      console.log(`✅ ${route}: Frontend accessible`);
    } catch (error) {
      console.log(`❌ ${route}: ${error.response?.status} - ${error.message}`);
    }
  }

  // Test 5: Course Data Loading
  console.log("\n📚 Test 5: Course Data");
  try {
    const coursesResponse = await axios.get("https://learnifyb.onrender.com/api/course/getallcourse");
    console.log(`✅ Courses API: Working (${coursesResponse.data?.length || 0} courses)`);
  } catch (error) {
    console.log(`❌ Courses API: ${error.response?.status} - ${error.message}`);
  }

  console.log("\n🎯 DEBUGGING COMPLETE");
  console.log("=====================================");
};

comprehensiveDebug();
