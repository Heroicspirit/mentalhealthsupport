import express from "express";
import { adminLogin, createAdmin } from "../../controller/adminlogin/adminloginController.js";

const router = express.Router();

router.post("/login", adminLogin);
router.post("/create", createAdmin); // For creating admin accounts via Postman

export const adminRouter = router;
