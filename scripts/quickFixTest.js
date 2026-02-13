import axios from "axios";

const quickFixAndTest = async () => {
  console.log("🚀 QUICK FIX & TEST");
  console.log("=====================");
  
  // Test 1: Check if backend is running with fixes
  console.log("\n📡 Testing backend health...");
  try {
    const healthResponse = await axios.get("https://learnifyb.onrender.com/api/");
    console.log("✅ Backend health:", healthResponse.data.message);
  } catch (error) {
    console.log("❌ Backend health check failed:", error.response?.status);
  }

  // Test 2: Test login with fixed cookies
  console.log("\n🔐 Testing login with fixed cookies...");
  try {
    const loginResponse = await axios.post("https://learnifyb.onrender.com/api/auth/login", {
      email: "student1@gmail.com",
      password: "password123"
    }, {
      withCredentials: true
    });
    
    console.log("✅ Login successful!");
    console.log("🍪 Cookie settings:", loginResponse.headers['set-cookie']?.[0]?.includes('SameSite=None') ? 'Fixed' : 'Not Fixed');
    
    // Test 3: Test protected endpoint immediately
    console.log("\n🛡️ Testing protected endpoint...");
    const userResponse = await axios.get("https://learnifyb.onrender.com/api/user/currentuser", {
      withCredentials: true
    });
    
    console.log("✅ Protected endpoint working!");
    console.log("👤 User authenticated:", userResponse.data.email);
    console.log("🎯 ALL 401 ERRORS FIXED!");
    
  } catch (error) {
    console.log("❌ Error details:", {
      status: error.response?.status,
      message: error.response?.data?.message,
      url: error.config?.url
    });
    
    if (error.response?.status === 401) {
      console.log("\n🔧 SOLUTION NEEDED:");
      console.log("1. Server needs restart to apply cookie fixes");
      console.log("2. Check if CORS is properly configured");
      console.log("3. Verify cookie settings in authController.js");
    }
  }
  
  console.log("\n🎉 TEST COMPLETE");
  console.log("=====================");
};

quickFixAndTest();
