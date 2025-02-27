import { sequelize } from '../database/index.js';
import Appointment from '../models/appointment/appointmentModel.js';

describe('Appointment Model Tests', () => {
  beforeAll(async () => {
    await sequelize.sync({ force: true }); // Reset DB before testing
  });

  test('Create an Appointment', async () => {
    const appointment = await Appointment.create({ userId: 1, date: '2025-03-01', problem: 'Anxiety' });
    expect(appointment.id).toBeDefined();
  });

  test('Fetch Appointment', async () => {
    const appointment = await Appointment.findOne({ where: { userId: 1 } });
    expect(appointment).not.toBeNull();
    expect(appointment.problem).toBe('Anxiety');
  });
});
