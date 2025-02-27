import request from 'supertest';
import app from '../index.js';

describe('Journal Route Tests', () => {
  test('GET /journal should return all journal entries', async () => {
    const response = await request(app).get('/journal');
    expect(response.status).toBe(200);
    expect(response.body).toBeInstanceOf(Array);
  });

  test('POST /journal should create a new journal entry', async () => {
    const newJournal = { userId: 1, content: 'Feeling good today.' };
    const response = await request(app).post('/journal').send(newJournal);
    
    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty('message', 'Journal entry created successfully');
  });
});
