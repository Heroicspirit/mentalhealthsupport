import request from 'supertest';
import app from '../index.js'; // Ensure this is the correct entry file

describe('Appointment Route Tests', () => {
  test('GET /appointment should return all appointments', async () => {
    const response = await request(app).get('/appointment');
    expect(response.status).toBe(200);
    expect(response.body).toBeInstanceOf(Array);
  });

  test('POST /appointment should create a new appointment', async () => {
    const newAppointment = { userId: 1, date: '2025-03-01', problem: 'Stress' };
    const response = await request(app).post('/appointment').send(newAppointment);
    
    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty('message', 'Appointment created successfully');
  });
});
