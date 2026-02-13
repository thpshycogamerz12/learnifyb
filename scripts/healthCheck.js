import express from "express";
import dotenv from "dotenv";

dotenv.config({ path: "./.env" });

const app = express();
const port = process.env.PORT || 8000;

// Simple health check route
app.get("/api/", (req, res) => {
  res.json({ 
    status: "OK", 
    message: "Learnify Backend is running",
    timestamp: new Date().toISOString()
  });
});

app.listen(port, () => {
  console.log(`🚀 Health check server running on port ${port}`);
});
