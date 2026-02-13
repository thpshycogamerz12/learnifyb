#!/bin/bash
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
