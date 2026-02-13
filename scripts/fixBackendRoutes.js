import fs from 'fs';
import path from 'path';

const fixBackendRoutes = () => {
  try {
    const indexPath = './index.js';
    const content = fs.readFileSync(indexPath, 'utf8');
    
    // Add health check route after routes
    const healthCheckRoute = `
// Health Check Route
app.get("/api/", (req, res) => {
  res.json({ 
    status: "OK", 
    message: "Learnify Backend is running",
    timestamp: new Date().toISOString()
  });
});

`;
    
    // Insert health check route before existing routes
    const fixedContent = content.replace(
      '// ================= ROUTES',
      healthCheckRoute + '// ================= ROUTES'
    );
    
    fs.writeFileSync(indexPath, fixedContent);
    
    console.log("✅ Backend health check route added!");
    console.log("🚀 Restart server to apply changes");
    
  } catch (error) {
    console.error("❌ Error fixing backend routes:", error);
  }
};

fixBackendRoutes();
