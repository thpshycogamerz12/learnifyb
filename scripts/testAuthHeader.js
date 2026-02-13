import axios from "axios";

const testAuthWithHeader = async () => {
  try {
    console.log("🧪 Testing auth with Authorization header...");
    
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
    
    // Extract token from cookie
    const setCookieHeader = loginResponse.headers['set-cookie'];
    let token = null;
    
    if (setCookieHeader) {
      const cookieString = setCookieHeader[0];
      const tokenMatch = cookieString.match(/token=([^;]+)/);
      if (tokenMatch) {
        token = tokenMatch[1];
      }
    }
    
    console.log("✅ Token extracted:", token ? "Success" : "Failed");
    
    // Step 2: Try to access protected endpoint with Authorization header
    console.log("\n🔐 Step 2: Testing with Authorization header...");
    const userResponse = await axios.get("https://learnifyb.onrender.com/api/user/currentuser", {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      }
    });
    
    console.log("✅ Protected endpoint accessible!");
    console.log("👤 User data:", userResponse.data);
    
  } catch (error) {
    console.error("❌ Auth header test error:", error.response?.status, error.response?.data);
  }
};

testAuthWithHeader();
