import jwt from "jsonwebtoken";

const optionalAuth = (req, res, next) => {
  try {
    let { token } = req.cookies;

    if (!token && req.headers.authorization) {
      const authHeader = req.headers.authorization;
      if (authHeader.startsWith("Bearer ")) {
        token = authHeader.substring(7);
      }
    }

    if (!token) {
      req.userId = null;
      return next();
    }

    try {
      const verifyToken = jwt.verify(token, process.env.JWT_SECRET);
      req.userId = verifyToken?.userId || null;
      req.token = token;
    } catch (jwtError) {
      req.userId = null;
    }

    return next();
  } catch (error) {
    req.userId = null;
    return next();
  }
};

export default optionalAuth;
