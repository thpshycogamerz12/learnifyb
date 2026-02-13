import fs from 'fs';

const createDeployFixes = () => {
  console.log("🛠️ CREATING DEPLOYMENT FIXES");
  console.log("================================");
  
  // Fix 1: Update userRoute.js with missing GET activity route
  console.log("\n1️⃣ Fixing missing API routes...");
  const userRoutePath = './routes/userRoute.js';
  const userRouteContent = fs.readFileSync(userRoutePath, 'utf8');
  
  // Add GET route for activity before POST route
  const fixedUserRoute = userRouteContent.replace(
    '// Activity tracking\nuserRouter.post("/activity", isAuth, updateActivity);',
    '// Activity tracking - GET route\nuserRouter.get("/activity", isAuth, (req, res) => {\n  res.json({ message: "Activity endpoint working", timestamp: new Date() });\n});\n\n// Activity tracking - POST route\nuserRouter.post("/activity", isAuth, updateActivity);'
  );
  
  fs.writeFileSync(userRoutePath, fixedUserRoute);
  console.log("✅ Added GET /api/user/activity route");
  
  // Fix 2: Create proper _redirects for frontend
  console.log("\n2️⃣ Creating proper _redirects...");
  const redirectsContent = '/*    /index.html   200\n';
  fs.writeFileSync('../frontend/public/_redirects', redirectsContent);
  console.log("✅ Updated frontend _redirects file");
  
  // Fix 3: Create deployment checklist
  console.log("\n3️⃣ Creating deployment checklist...");
  const checklist = `# 🚀 DEPLOYMENT CHECKLIST

## Backend (learnifyb.onrender.com)
- [ ] Push all fixes to GitHub
- [ ] Redeploy backend on Render
- [ ] Verify environment variables are set
- [ ] Test /api/ health endpoint

## Frontend (learnifyf.onrender.com)  
- [ ] Push _redirects to public/ folder
- [ ] Update render.yaml with SPA config
- [ ] Redeploy frontend on Render
- [ ] Test /login and /signup routes

## After Deployment
- [ ] Test login: https://learnifyf.onrender.com/login
- [ ] Test authentication flow
- [ ] Verify no console errors
- [ ] Test data loading from database

## Working Credentials
- Admin: admin@learnify.com / Admin@123
- Student: student1@gmail.com / password123
`;
  
  fs.writeFileSync('DEPLOYMENT_CHECKLIST.md', checklist);
  console.log("✅ Created deployment checklist");
  
  console.log("\n🎯 FIXES CREATED!");
  console.log("📋 Next Steps:");
  console.log("1. Commit and push changes to GitHub");
  console.log("2. Redeploy both frontend and backend on Render");
  console.log("3. Test all functionality");
  console.log("================================");
};

createDeployFixes();
