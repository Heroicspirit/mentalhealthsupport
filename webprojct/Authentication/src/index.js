import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import { db } from "./database/index.js";
import { userRouter, authRouter } from "./route/index.js";
import { appointmentRouter } from "./route/appointment/appointmentRoute.js";
import { journalRouter } from "./route/journal/journalRoute.js";
import dotenv from "dotenv";
import { authenticateToken } from "./middleware/token-middleware.js";
import { adminloginRouter } from "./route/adminlogin/adminloginRoute.js"; // Updated import
import { adminRouter } from "./route/admin/adminRoute.js";


dotenv.config();

const app = express();

// CORS setup
app.use(cors({
  origin: "http://localhost:5173", // Your frontend URL
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true,
}));

console.log("CORS middleware applied for origin: http://localhost:5173");

// Handle preflight requests
app.options("*", cors());

const port = process.env.PORT || 5000;
app.use(bodyParser.json());

// Public routes (no token required)
app.use("/api/auth", authRouter);
app.use("/api/adminlogin", adminloginRouter); // Admin login does not require token

// Protected routes (token required)
app.use("/api/users", authenticateToken, userRouter);
app.use("/api/appointments", authenticateToken, appointmentRouter);
app.use("/api/journals", authenticateToken, journalRouter);
app.use("/api/admin", authenticateToken, adminRouter);

// Test route for verifying CORS
app.get("/api/test", (req, res) => {
  res.json({ message: "CORS is working!" });
});

// Start server and connect to database
app.listen(port, async function () {
  console.log("Project running on port " + port);
  await db(); // Ensure database connection and synchronization
  console.log("Database connected successfully"); // Log database connection
});
