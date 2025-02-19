import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import AdminLogin from "../../models/adminlogin/adminloginModel.js";

dotenv.config();
//hello
// Admin Login
export const adminLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find admin by email
    const admin = await AdminLogin.findOne({ where: { email } });

    if (!admin) {
      return res.status(401).json({ success: false, message: "Admin not found" });
    }

    // Direct password comparison (no bcrypt)
    if (password !== admin.password) {
      return res.status(401).json({ success: false, message: "Incorrect password" });
    }

    // Generate JWT token
    const token = jwt.sign({ id: admin.id, email: admin.email }, process.env.JWT_SECRET_KEY, {
      expiresIn: process.env.expiresIn,
    });

    res.json({ success: true, token });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server error", error: error.message });
  }
};

// Create Admin Account (For testing in Postman)
export const createAdmin = async (req, res) => {
  try {
    const { email, password } = req.body;

    const existingAdmin = await AdminLogin.findOne({ where: { email } });
    if (existingAdmin) {
      return res.status(400).json({ success: false, message: "Admin already exists" });
    }

    const newAdmin = await AdminLogin.create({ email, password });

    res.status(201).json({ success: true, message: "Admin created successfully", admin: newAdmin });
  } catch (error) {
    res.status(500).json({ success: false, message: "Error creating admin", error: error.message });
  }
};
