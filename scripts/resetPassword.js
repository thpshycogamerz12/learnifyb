import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import dotenv from "dotenv";
import User from "../models/userModel.js";
import connectDb from "../configs/db.js";

dotenv.config({ path: "./.env" });

const resetUserPassword = async () => {
  try {
    await connectDb();
    
    const userEmail = "student1@gmail.com";
    const newPassword = "password123"; // Simple password for testing
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    
    // Update user password
    const result = await User.updateOne(
      { email: userEmail },
      { 
        password: hashedPassword,
        status: "approved" // Ensure status is approved
      }
    );
    
    if (result.modifiedCount > 0) {
      console.log("✅ Password reset successfully!");
      console.log("📧 Email:", userEmail);
      console.log("🔑 New Password:", newPassword);
      console.log("🎯 Now try logging in with these credentials");
    } else {
      console.log("❌ User not found or no changes made");
    }
    
    process.exit(0);
  } catch (error) {
    console.error("❌ Error:", error);
    process.exit(1);
  }
};

resetUserPassword();
