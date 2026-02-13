import axios from "axios";

const debugDeployedApp = async () => {
  console.log("🌍 DEBUGGING DEPLOYED APP");
  console.log("============================");
  
  // Test 1: Backend Health Check
  console.log("\n🏥 Backend Health:");
  try {
    const healthResponse = await axios.get("https://learnifyb.onrender.com/api/");
    console.log("✅ Status:", healthResponse.data.status);
    console.log("✅ Message:", healthResponse.data.message);
  } catch (error) {
    console.log("❌ Backend Error:", error.response?.status, error.response?.data);
  }

  // Test 2: Frontend Accessibility
  console.log("\n🌐 Frontend Routes:");
  const frontendRoutes = [
    { path: "/", name: "Home" },
    { path: "/login", name: "Login" },
    { path: "/signup", name: "Signup" }
  ];

  for (const route of frontendRoutes) {
    try {
      const response = await axios.get(`https://learnifyf.onrender.com${route.path}`);
      console.log(`✅ ${route.name}: Accessible`);
    } catch (error) {
      console.log(`❌ ${route.name}: ${error.response?.status} - ${error.message}`);
      if (error.response?.status === 404) {
        console.log("   🔧 This suggests SPA routing issue");
      }
    }
  }

  // Test 3: Authentication Flow
  console.log("\n🔐 Authentication Test:");
  try {
    // Login
    const loginResponse = await axios.post("https://learnifyb.onrender.com/api/auth/login", {
      email: "student1@gmail.com",
      password: "password123"
    }, {
      withCredentials: true,
      headers: { 'Content-Type': 'application/json' }
    });
    
    console.log("✅ Login: Successful");
    
    // Get current user
    const userResponse = await axios.get("https://learnifyb.onrender.com/api/user/currentuser", {
      withCredentials: true
    });
    
    console.log("✅ Current User:", userResponse.data.email);
    console.log("✅ Authentication: Working");
    
  } catch (error) {
    console.log("❌ Auth Error:", {
      status: error.response?.status,
      message: error.response?.data?.message,
      endpoint: error.config?.url
    });
  }

  // Test 4: Data Loading
  console.log("\n📊 Data Loading Test:");
  try {
    const coursesResponse = await axios.get("https://learnifyb.onrender.com/api/course/getallcourse");
    console.log("✅ Courses:", coursesResponse.data.length, "loaded");
    
    const reviewsResponse = await axios.get("https://learnifyb.onrender.com/api/review/allReview");
    console.log("✅ Reviews:", reviewsResponse.data.length, "loaded");
    
  } catch (error) {
    console.log("❌ Data Error:", error.response?.status, error.response?.data?.message);
  }

  // Test 5: Common Console Errors
  console.log("\n🐛 Common Console Errors Check:");
  const problematicEndpoints = [
    "/api/user/activity",
    "/api/attendance/my", 
    "/api/sharednotes",
    "/api/notifications/my"
  ];

  for (const endpoint of problematicEndpoints) {
    try {
      await axios.get(`https://learnifyb.onrender.com${endpoint}`, {
        withCredentials: true
      });
      console.log(`✅ ${endpoint}: Working`);
    } catch (error) {
      console.log(`❌ ${endpoint}: ${error.response?.status} - ${error.response?.data?.message || error.message}`);
    }
  }

  console.log("\n🎯 DEBUGGING COMPLETE");
  console.log("============================");
  console.log("📋 SUMMARY:");
  console.log("• If frontend routes show 404 → Check _redirects file");
  console.log("• If auth shows 401 → Check cookie settings");
  console.log("• If data shows 400 → Check .env variables");
  console.log("• If endpoints missing → Check route definitions");
};

debugDeployedApp();
