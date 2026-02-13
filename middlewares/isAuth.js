
import jwt from "jsonwebtoken";

const isAuth = async (req, res, next) => {
  try {
    // Check token in cookies first
    let { token } = req.cookies;
    
    // If no token in cookies, check Authorization header
    if (!token && req.headers.authorization) {
      const authHeader = req.headers.authorization;
      if (authHeader.startsWith('Bearer ')) {
        token = authHeader.substring(7);
      }
    }
    
    // If still no token, return 401
    if (!token) {
      return res.status(401).json({ 
        message: "Authentication required",
        debug: "No token found in cookies or authorization header"
      });
    }
    
    // Verify token
    let verifyToken;
    try {
      verifyToken = jwt.verify(token, process.env.JWT_SECRET);
    } catch (jwtError) {
      return res.status(401).json({ 
        message: "Invalid or expired token",
        debug: jwtError.message
      });
    }
    
    if (!verifyToken) {
      return res.status(401).json({ 
        message: "Token verification failed",
        debug: "Invalid token structure"
      });
    }

    // Success - attach user ID and continue
    req.userId = verifyToken.userId;
    req.token = token;
    next();
    
  } catch (error) {
    console.error("🔐 Auth Middleware Error:", error.message);
    return res.status(500).json({ 
      message: "Authentication system error",
      debug: error.message
    });
  }
};

export default isAuth;
