import mongoose from "mongoose";
import dotenv from "dotenv";
import User from "../models/userModel.js";
import connectDb from "../configs/db.js";

dotenv.config({ path: "./.env" });

const debugAuth = async () => {
  try {
    await connectDb();
    
    // Find and update a specific user to approved status
    const userEmail = "student1@gmail.com"; // Change this to any user email that's having issues
    const user = await User.findOne({ email: userEmail });
    
    if (user) {
      console.log("🔍 Found user:", userEmail);
      console.log("📊 Current Status:", user.status);
      console.log("👤 Role:", user.role);
      
      // Update status to approved
      user.status = "approved";
      await user.save();
      console.log("✅ Updated user status to APPROVED");
      console.log("🎯 Now try logging in with:", userEmail);
    } else {
      console.log("❌ User not found:", userEmail);
    }
    
    process.exit(0);
  } catch (error) {
    console.error("❌ Error:", error);
    process.exit(1);
  }
};

debugAuth();
