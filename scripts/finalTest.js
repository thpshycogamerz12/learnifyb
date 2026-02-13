import axios from "axios";

const finalComprehensiveTest = async () => {
  console.log("🎯 FINAL COMPREHENSIVE TEST");
  console.log("============================");
  
  let testResults = {
    passed: 0,
    failed: 0,
    details: []
  };
  
  // Test 1: Backend Health
  console.log("\n🏥 Backend Health Test:");
  try {
    const healthResponse = await axios.get("https://learnifyb.onrender.com/api/");
    console.log("✅ Backend Health:", healthResponse.data.status);
    testResults.passed++;
    testResults.details.push("✅ Backend health check");
  } catch (error) {
    console.log("❌ Backend Health:", error.response?.status);
    testResults.failed++;
    testResults.details.push("❌ Backend health check");
  }
  
  // Test 2: Authentication Flow
  console.log("\n🔐 Authentication Test:");
  try {
    // Step 1: Login
    const loginResponse = await axios.post("https://learnifyb.onrender.com/api/auth/login", {
      email: "student1@gmail.com",
      password: "password123"
    }, {
      withCredentials: true,
      headers: { 'Content-Type': 'application/json' }
    });
    
    console.log("✅ Login successful");
    testResults.passed++;
    
    // Step 2: Access protected endpoints
    const protectedTests = [
      { endpoint: "/api/user/currentuser", name: "Current User" },
      { endpoint: "/api/user/activity", name: "Activity" },
      { endpoint: "/api/attendance/my", name: "Attendance" },
      { endpoint: "/api/sharednotes", name: "Shared Notes" },
      { endpoint: "/api/notifications/my", name: "Notifications" }
    ];
    
    for (const test of protectedTests) {
      try {
        const response = await axios.get(`https://learnifyb.onrender.com${test.endpoint}`, {
          withCredentials: true
        });
        console.log(`✅ ${test.name}: Working`);
        testResults.passed++;
        testResults.details.push(`✅ ${test.name}`);
      } catch (error) {
        console.log(`❌ ${test.name}: ${error.response?.status} - ${error.response?.data?.message || error.message}`);
        testResults.failed++;
        testResults.details.push(`❌ ${test.name}: ${error.response?.status}`);
      }
    }
    
  } catch (error) {
    console.log("❌ Authentication failed:", error.response?.status);
    testResults.failed++;
    testResults.details.push("❌ Authentication flow");
  }
  
  // Test 3: Frontend Routes
  console.log("\n🌐 Frontend Routes Test:");
  const frontendTests = [
    { path: "/", name: "Home" },
    { path: "/login", name: "Login" },
    { path: "/signup", name: "Signup" }
  ];
  
  for (const test of frontendTests) {
    try {
      const response = await axios.get(`https://learnifyf.onrender.com${test.path}`);
      console.log(`✅ ${test.name}: Accessible`);
      testResults.passed++;
      testResults.details.push(`✅ ${test.name} route`);
    } catch (error) {
      console.log(`❌ ${test.name}: ${error.response?.status} - ${error.message}`);
      testResults.failed++;
      testResults.details.push(`❌ ${test.name} route: ${error.response?.status}`);
    }
  }
  
  // Test 4: Data Loading
  console.log("\n📊 Data Loading Test:");
  try {
    const coursesResponse = await axios.get("https://learnifyb.onrender.com/api/course/getallcourse");
    console.log(`✅ Courses: ${coursesResponse.data.length} loaded`);
    testResults.passed++;
    testResults.details.push("✅ Courses data loading");
    
    const reviewsResponse = await axios.get("https://learnifyb.onrender.com/api/review/allReview");
    console.log(`✅ Reviews: ${reviewsResponse.data.length} loaded`);
    testResults.passed++;
    testResults.details.push("✅ Reviews data loading");
    
  } catch (error) {
    console.log("❌ Data loading:", error.response?.status);
    testResults.failed++;
    testResults.details.push("❌ Data loading");
  }
  
  // Final Results
  console.log("\n🎉 FINAL RESULTS");
  console.log("===================");
  console.log(`✅ Passed: ${testResults.passed}`);
  console.log(`❌ Failed: ${testResults.failed}`);
  console.log(`📊 Success Rate: ${((testResults.passed / (testResults.passed + testResults.failed)) * 100).toFixed(1)}%`);
  
  console.log("\n📋 Detailed Results:");
  testResults.details.forEach(result => console.log(result));
  
  if (testResults.failed === 0) {
    console.log("\n🎊 PERFECT! All tests passed!");
    console.log("✅ No 401 errors");
    console.log("✅ No 404 errors"); 
    console.log("✅ All data loading properly");
    console.log("✅ Console should be clean");
  } else {
    console.log("\n🔧 Some issues still need fixing");
    console.log("📝 Check the failed tests above");
  }
  
  console.log("===================");
};

finalComprehensiveTest();
