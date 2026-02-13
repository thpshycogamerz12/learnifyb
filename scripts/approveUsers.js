import mongoose from "mongoose";
import User from "../models/userModel.js";
import connectDb from "../configs/db.js";
import dotenv from "dotenv";

dotenv.config({ path: "./.env" });

const approveAllUsers = async () => {
  try {
    await connectDb();
    
    // Approve all pending users
    const result = await User.updateMany(
      { status: "pending" },
      { status: "approved" }
    );
    
    console.log(`✅ Approved ${result.modifiedCount} pending users`);
    
    // List all users
    const users = await User.find({});
    console.log('All users:');
    users.forEach(user => {
      console.log(`- ${user.email} | Status: ${user.status} | Role: ${user.role}`);
    });
    
    process.exit(0);
  } catch (error) {
    console.error("❌ Error:", error);
    process.exit(1);
  }
};

approveAllUsers();
