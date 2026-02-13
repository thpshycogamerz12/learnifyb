import express from "express";
import sendMail from "../configs/Mail.js";

const router = express.Router();

// Test email configuration
router.get("/test-email", async (req, res) => {
  try {
    const testEmail = req.query.email || "test@example.com";
    await sendMail(testEmail, "1234");
    return res.status(200).json({ 
      message: "Test email sent successfully!",
      note: "Check your email inbox and spam folder"
    });
  } catch (error) {
    return res.status(500).json({ 
      message: "Email test failed",
      error: error.message,
      hint: "Make sure EMAIL and EMAIL_PASS are set in .env file"
    });
  }
});

export default router;

