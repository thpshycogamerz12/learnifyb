@echo off
echo 🔄 RESTARTING BACKEND SERVER...
echo This will apply all cookie and authentication fixes
echo ============================================

taskkill /f /im node.exe 2>nul
timeout /t 2 /nobreak >nul

echo 🚀 Starting server with fixes...
npm start

echo ✅ Server restarted with all fixes applied!
pause
