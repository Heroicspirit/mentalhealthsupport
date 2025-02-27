import { getAppointments, updateAppointment, deleteAppointment } from "../../controller/admin/adminController.js";
import Appointment from "../../models/appointment/appointmentModel.js";

// Mocking Appointment model
jest.mock("../../models/appointment/appointmentModel.js");

describe("Admin Controller", () => {
  
  // Test Case: Fetch all appointments
  it("should fetch all appointments", async () => {
    const mockAppointments = [
      { id: 1, date: "2025-03-01", time: "10:00", problem: "Stress", duration: 45 },
      { id: 2, date: "2025-03-02", time: "11:00", problem: "Depression", duration: 60 },
    ];

    Appointment.findAll.mockResolvedValue(mockAppointments);

    const req = {};
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    await getAppointments(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(mockAppointments);
  });

  // Test Case: Update appointment
  it("should update an appointment", async () => {
    const mockAppointment = { id: 1, date: "2025-03-01", time: "10:00", problem: "Stress", duration: 45 };
    Appointment.findByPk.mockResolvedValue(mockAppointment);
    Appointment.prototype.save = jest.fn().mockResolvedValue(mockAppointment);

    const req = {
      params: { id: 1 },
      body: { date: "2025-03-01", time: "10:30", problem: "Anxiety", duration: 30 },
    };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    await updateAppointment(req, res);

    expect(Appointment.findByPk).toHaveBeenCalledWith(1);
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(mockAppointment);
  });

  // Test Case: Delete appointment
  it("should delete an appointment", async () => {
    Appointment.destroy.mockResolvedValue(1);

    const req = { params: { id: 1 } };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    await deleteAppointment(req, res);

    expect(Appointment.destroy).toHaveBeenCalledWith({ where: { id: 1 } });
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({ message: "Appointment deleted successfully" });
  });
});
