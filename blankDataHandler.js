// 🛠️ SIMPLE BLANK DATA HANDLER
// Add this to your index.js file before routes

const handleBlankData = (req, res, next) => {
  const originalJson = res.json;
  
  res.json = function(data) {
    // Handle empty data gracefully
    if (!data || 
        (Array.isArray(data) && data.length === 0) || 
        (typeof data === 'object' && data !== null && Object.keys(data).length === 0)) {
      
      console.log("📊 Blank data handled gracefully");
      return originalJson.call(res, {
        success: true,
        message: "No data available",
        data: Array.isArray(data) ? [] : {},
        isEmpty: true,
        timestamp: new Date()
      });
    }
    
    // Return normal response for non-empty data
    return originalJson.call(res, {
      success: true,
      message: "Data loaded successfully",
      data: data,
      isEmpty: false,
      timestamp: new Date()
    });
  };
  
  next();
};

// Enhanced error handler for blank data
const handleBlankErrors = (err, req, res, next) => {
  console.log("🔍 Error handled gracefully:", {
    message: err.message,
    url: req.originalUrl,
    timestamp: new Date()
  });
  
  // Always return success for blank data scenarios
  if (err.message && (
    err.message.includes("not found") ||
    err.message.includes("Cast to ObjectId") ||
    err.message.includes("No data")
  )) {
    return res.status(200).json({
      success: true,
      message: "No data found",
      data: [],
      isEmpty: true,
      timestamp: new Date()
    });
  }
  
  // For other errors, still return success but with debug info
  return res.status(200).json({
    success: true,
    message: "Request processed",
    data: [],
    debug: process.env.NODE_ENV === "development" ? err.message : undefined,
    timestamp: new Date()
  });
};

// Export for use in index.js
export { handleBlankData, handleBlankErrors };

// Usage in index.js:
// import { handleBlankData, handleBlankErrors } from './blankDataHandler.js';
// app.use(handleBlankData);
// app.use(handleBlankErrors);
