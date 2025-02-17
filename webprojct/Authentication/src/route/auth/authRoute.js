import express from "express";
import { authController } from "../../controller/index.js";
import { authenticateToken } from "../../middleware/token-middleware.js"; // Import the middleware

const router = express.Router();


router.post("/signup", authController.signup);
// Public route (no token required)
router.post("/login", authController.login);

// Protected route (token required)
router.get("/init", authenticateToken, authController.init);

export { router as authRouter };


