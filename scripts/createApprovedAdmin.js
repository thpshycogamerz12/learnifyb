import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import dotenv from "dotenv";
import User from "../models/userModel.js";
import connectDb from "../configs/db.js";

dotenv.config({ path: "./.env" });

const createApprovedAdmin = async () => {
  try {
    await connectDb();
    
    // Create approved admin account
    const adminEmail = "admin@learnify.com";
    const adminPassword = "Admin@123";
    const adminName = "Admin User";

    // Check if admin already exists
    const existingAdmin = await User.findOne({ email: adminEmail });
    if (existingAdmin) {
      console.log("❌ Admin account already exists!");
      process.exit(0);
    }

    // Create admin account with approved status
    const hashedPassword = await bcrypt.hash(adminPassword, 10);
    const admin = await User.create({
      name: adminName,
      email: adminEmail,
      password: hashedPassword,
      role: "admin",
      status: "approved", // ✅ IMPORTANT: Set status to approved
      createdByAdmin: true,
    });

    console.log("✅ Approved Admin account created successfully!");
    console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
    console.log("📧 Email:", adminEmail);
    console.log("🔑 Password:", adminPassword);
    console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
    
    process.exit(0);
  } catch (error) {
    console.error("❌ Error creating admin:", error);
    process.exit(1);
  }
};

createApprovedAdmin();
