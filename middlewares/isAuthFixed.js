import jwt from "jsonwebtoken";

const isAuth = async (req, res, next) => {
  try {
    // Check for token in cookies first
    let { token } = req.cookies;
    
    // If no token in cookies, check Authorization header
    if (!token && req.headers.authorization) {
      const authHeader = req.headers.authorization;
      if (authHeader.startsWith('Bearer ')) {
        token = authHeader.substring(7); // Remove 'Bearer ' prefix
      }
    }
    
    if (!token) {
      return res.status(401).json({ message: "user doesn't have token" });
    }
    
    let verifyToken = jwt.verify(token, process.env.JWT_SECRET);
    
    if (!verifyToken) {
      return res.status(401).json({ message: "user doesn't have valid token" });
    }

    req.userId = verifyToken.userId;
    next();
  } catch (error) {
    console.log("Auth error:", error.message);
    return res.status(401).json({ message: "Invalid token" });
  }
};

export default isAuth;
