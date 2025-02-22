import express from "express";
import { getAppointments, updateAppointment, deleteAppointment } from "../../controller/admin/adminController.js";

const router = express.Router();

// Route to get all appointments
router.get("/appointments", getAppointments);

// Route to update an appointment
router.put("/appointments/:id", updateAppointment);

// Route to delete an appointment
router.delete("/appointments/:id", deleteAppointment);

export const adminRouter= router;
