import { createAppointment, getAppointments } from '../controller/appointment/appointmentController.js';

describe('Appointment Controller Tests', () => {
  test('Create Appointment', async () => {
    const req = { body: { userId: 1, date: '2025-03-01', problem: 'Stress' } };
    const res = { json: jest.fn(), status: jest.fn().mockReturnThis() };

    await createAppointment(req, res);

    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith(expect.objectContaining({ message: 'Appointment created successfully' }));
  });

  test('Get All Appointments', async () => {
    const req = {};
    const res = { json: jest.fn(), status: jest.fn().mockReturnThis() };

    await getAppointments(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(expect.any(Array));
  });
});
