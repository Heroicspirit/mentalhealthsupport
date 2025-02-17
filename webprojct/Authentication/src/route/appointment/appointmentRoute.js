import express from "express";
const router = express.Router();
import { createAppointment, getAppointments, updateAppointment, deleteAppointment } from "../../controller/appointment/appointmentController.js";
import { authenticateToken } from "../../middleware/token-middleware.js";

router.post("/", authenticateToken, createAppointment);
router.get("/", authenticateToken, getAppointments);
router.put("/:id", authenticateToken, updateAppointment);
router.delete("/:id", authenticateToken, deleteAppointment);

export const appointmentRouter = router;
