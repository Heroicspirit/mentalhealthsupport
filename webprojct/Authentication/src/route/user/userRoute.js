import express from "express";
import { userController } from "../../controller/index.js";
import { authenticateToken } from "../../middleware/token-middleware.js"; // Import the middleware

const router = express.Router();

// If user creation is public, do not apply authenticateToken here:
router.post("/", userController.create);

// Apply the authenticateToken middleware for other routes
router.use(authenticateToken);

// Protected routes (token required)
router.get("/", userController.getAll);
router.put("/:id", userController.update);
router.get("/:id", userController.getById);
router.delete("/:id", userController.delelteById);

export { router as userRouter };









