import express from "express";
import { adminLogin, createAdmin } from "../../controller/adminlogin/adminloginController.js";

const router = express.Router();

// Route to handle admin login
router.post("/login", adminLogin);

// Route to create admin (for testing purposes only)
router.post("/create", createAdmin); // For creating admin accounts via Postman (remove or secure this in production)

export const adminloginRouter = router; // Export updated router
