import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

// Middleware to verify JWT token
export function authenticateToken(req, res, next) {
  // Skip token verification for the login route
  if (req.originalUrl.includes("/api/auth/login")) {
    return next();
  }

  // Get token from Authorization header
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1]; // Extract token

  if (!token) {
    console.error("TokenMiddleware: No token provided for route:", req.originalUrl);
    return res.status(401).json({ 
      success: false,
      message: "Access denied. No token provided.",
      errorCode: "TOKEN_MISSING"
    });
  }

  // Verify the token using the secret key from .env
  const secretKey = process.env.JWT_SECRET_KEY;
  if (!secretKey) {
    console.error("TokenMiddleware: Missing JWT secret key in environment variables");
    return res.status(500).json({
      success: false,
      message: "Server configuration error",
      errorCode: "SERVER_ERROR"
    });
  }

  jwt.verify(token, secretKey, (err, decoded) => {
    if (err) {
      console.error("TokenMiddleware: Token verification failed:", err.message);
      const errorMessage = err.name === "TokenExpiredError" 
        ? "Session expired. Please login again."
        : "Invalid token. Please authenticate.";
      
      return res.status(403).json({
        success: false,
        message: errorMessage,
        errorCode: err.name === "TokenExpiredError" ? "TOKEN_EXPIRED" : "INVALID_TOKEN"
      });
    }
    
    req.user = decoded; // Attach decoded payload to request object
    next(); // Proceed to the next middleware or route handler
  });
}
