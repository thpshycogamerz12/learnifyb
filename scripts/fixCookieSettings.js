import fs from 'fs';
import path from 'path';

const fixCookieSettings = () => {
  try {
    const authControllerPath = './controllers/authController.js';
    const content = fs.readFileSync(authControllerPath, 'utf8');
    
    // Replace cookie settings to fix SameSite issue
    const fixedContent = content
      .replace(/secure:false,/g, 'secure:true,')
      .replace(/sameSite: "Strict"/g, 'sameSite: "None"');
    
    fs.writeFileSync(authControllerPath, fixedContent);
    
    console.log("✅ Cookie settings fixed!");
    console.log("🔧 Changes made:");
    console.log("  - secure: false → secure: true");
    console.log("  - sameSite: 'Strict' → sameSite: 'None'");
    console.log("🚀 Restart server to apply changes");
    
  } catch (error) {
    console.error("❌ Error fixing cookie settings:", error);
  }
};

fixCookieSettings();
