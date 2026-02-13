import axios from "axios";

const testLogin = async () => {
  try {
    console.log("🧪 Testing login endpoint...");
    
    const response = await axios.post("https://learnifyb.onrender.com/api/auth/login", {
      email: "student1@gmail.com",
      password: "password123" // Use actual password
    }, {
      withCredentials: true,
      headers: {
        'Content-Type': 'application/json'
      }
    });
    
    console.log("✅ Login Response:", response.status);
    console.log("📊 Response Data:", response.data);
    
    if (response.data.token) {
      console.log("🎉 Login successful! Token received");
    } else {
      console.log("❌ Login failed - no token in response");
    }
    
  } catch (error) {
    console.error("❌ Login Error:", error.response?.status, error.response?.data);
  }
};

testLogin();
