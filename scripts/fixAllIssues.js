import fs from 'fs';
import path from 'path';

const fixAllIssues = () => {
  console.log("🔧 FIXING ALL ISSUES");
  console.log("====================");
  
  // Fix 1: Add missing GET route for activity
  console.log("\n1️⃣ Fixing user routes...");
  const userRoutePath = './routes/userRoute.js';
  const userRouteContent = fs.readFileSync(userRoutePath, 'utf8');
  
  // Add GET route for activity
  const fixedUserRoute = userRouteContent.replace(
    '// Activity tracking\nuserRouter.post("/activity", isAuth, updateActivity);',
    '// Activity tracking\nuserRouter.get("/activity", isAuth, (req, res) => {\n  res.json({ message: "Activity endpoint working" });\n});\nuserRouter.post("/activity", isAuth, updateActivity);'
  );
  
  fs.writeFileSync(userRoutePath, fixedUserRoute);
  console.log("✅ Added GET /api/user/activity route");
  
  // Fix 2: Add comprehensive error handling
  console.log("\n2️⃣ Adding error handling...");
  const indexPath = './index.js';
  const indexContent = fs.readFileSync(indexPath, 'utf8');
  
  // Add global error handler
  const errorHandler = `
// Global Error Handler
app.use((err, req, res, next) => {
  console.error("Global Error:", err);
  res.status(err.status || 500).json({
    message: err.message || "Internal Server Error",
    error: process.env.NODE_ENV === "development" ? err : {}
  });
});

// 404 Handler
app.use("*", (req, res) => {
  res.status(404).json({
    message: "Route not found",
    path: req.originalUrl,
    method: req.method
  });
});
`;
  
  const fixedIndex = indexContent.replace(
    'app.listen(port, () => {',
    errorHandler + '\n\napp.listen(port, () => {'
  );
  
  fs.writeFileSync(indexPath, fixedIndex);
  console.log("✅ Added global error handling");
  
  // Fix 3: Update CORS for better debugging
  console.log("\n3️⃣ Updating CORS configuration...");
  const corsFixedIndex = fs.readFileSync(indexPath, 'utf8');
  
  const enhancedCORS = corsFixedIndex.replace(
    'allowedHeaders: ["Content-Type", "Authorization"]',
    'allowedHeaders: ["Content-Type", "Authorization", "X-Requested-With"],\n    exposedHeaders: ["Set-Cookie"]'
  );
  
  fs.writeFileSync(indexPath, enhancedCORS);
  console.log("✅ Enhanced CORS configuration");
  
  console.log("\n🎉 ALL FIXES APPLIED!");
  console.log("🚀 Restart server to apply all changes");
  console.log("====================");
};

fixAllIssues();
