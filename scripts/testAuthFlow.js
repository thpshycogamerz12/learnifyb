import axios from "axios";

const testAuthFlow = async () => {
  try {
    console.log("🧪 Testing complete auth flow...");
    
    // Step 1: Login to get token
    console.log("\n📝 Step 1: Logging in...");
    const loginResponse = await axios.post("https://learnifyb.onrender.com/api/auth/login", {
      email: "student1@gmail.com",
      password: "password123"
    }, {
      withCredentials: true,
      headers: {
        'Content-Type': 'application/json'
      }
    });
    
    console.log("✅ Login successful!");
    console.log("🍪 Cookies received:", loginResponse.headers['set-cookie']);
    
    // Step 2: Try to access protected endpoint
    console.log("\n🔐 Step 2: Testing protected endpoint...");
    const userResponse = await axios.get("https://learnifyb.onrender.com/api/user/currentuser", {
      withCredentials: true,
      headers: {
        'Content-Type': 'application/json'
      }
    });
    
    console.log("✅ Protected endpoint accessible!");
    console.log("👤 User data:", userResponse.data);
    
  } catch (error) {
    console.error("❌ Auth flow error:", error.response?.status, error.response?.data);
    
    if (error.response?.status === 401) {
      console.log("🔍 This suggests cookies are not being sent properly");
      console.log("🔧 Check CORS and cookie settings");
    }
  }
};

testAuthFlow();
