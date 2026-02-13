import fs from 'fs';
import path from 'path';

const createRestartScript = () => {
  const restartScript = `#!/bin/bash
echo "🔄 RESTARTING BACKEND SERVER..."
echo "This will apply all cookie and authentication fixes"
echo "============================================"

# Kill any existing node processes
pkill -f "node index.js" 2>/dev/null || true
pkill -f "nodemon index.js" 2>/dev/null || true

# Wait a moment
sleep 2

# Start the server
echo "🚀 Starting server with fixes..."
npm start

echo "✅ Server restarted with all fixes applied!"
`;

  fs.writeFileSync('./restart.sh', restartScript);
  
  // For Windows
  const windowsScript = `@echo off
echo 🔄 RESTARTING BACKEND SERVER...
echo This will apply all cookie and authentication fixes
echo ============================================

taskkill /f /im node.exe 2>nul
timeout /t 2 /nobreak >nul

echo 🚀 Starting server with fixes...
npm start

echo ✅ Server restarted with all fixes applied!
pause
`;

  fs.writeFileSync('./restart.bat', windowsScript);
  
  console.log("✅ Restart scripts created!");
  console.log("📁 Files created:");
  console.log("  - restart.sh (Linux/Mac)");
  console.log("  - restart.bat (Windows)");
  console.log("");
  console.log("🚀 Run the appropriate script to restart server with all fixes");
};

createRestartScript();
