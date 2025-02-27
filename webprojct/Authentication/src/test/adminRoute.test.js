import express from "express";
import request from "supertest";
import { adminRouter } from "../../routes/admin/adminRoute.js";
import * as adminController from "../../controller/admin/adminController.js";

// Mock controller methods
jest.mock("../../controller/admin/adminController.js");

describe("Admin Routes", () => {
  
  let app;

  beforeAll(() => {
    app = express();
    app.use(express.json());
    app.use("/admin", adminRouter);
  });

  // Test Case: Get all appointments
  it("should get all appointments", async () => {
    const mockAppointments = [
      { id: 1, date: "2025-03-01", time: "10:00", problem: "Stress", duration: 45 },
    ];
    adminController.getAppointments.mockResolvedValue(mockAppointments);

    const res = await request(app).get("/admin/appointments");

    expect(res.status).toBe(200);
    expect(res.body).toEqual(mockAppointments);
  });

  // Test Case: Update appointment
  it("should update an appointment", async () => {
    const mockAppointment = { id: 1, date: "2025-03-01", time: "10:00", problem: "Stress", duration: 45 };
    adminController.updateAppointment.mockResolvedValue(mockAppointment);

    const res = await request(app)
      .put("/admin/appointments/1")
      .send({ date: "2025-03-01", time: "10:30", problem: "Anxiety", duration: 30 });

    expect(res.status).toBe(200);
    expect(res.body).toEqual(mockAppointment);
  });

  // Test Case: Delete appointment
  it("should delete an appointment", async () => {
    adminController.deleteAppointment.mockResolvedValue({ message: "Appointment deleted successfully" });

    const res = await request(app).delete("/admin/appointments/1");

    expect(res.status).toBe(200);
    expect(res.body.message).toBe("Appointment deleted successfully");
  });
});
