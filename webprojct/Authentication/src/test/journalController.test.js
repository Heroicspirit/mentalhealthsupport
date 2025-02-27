import { createJournalEntry, getJournalEntries } from '../controller/journal/journalController.js';

describe('Journal Controller Tests', () => {
  test('Create Journal Entry', async () => {
    const req = { body: { userId: 1, content: 'Feeling good today.' } };
    const res = { json: jest.fn(), status: jest.fn().mockReturnThis() };

    await createJournalEntry(req, res);

    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith(expect.objectContaining({ message: 'Journal entry created successfully' }));
  });

  test('Get All Journal Entries', async () => {
    const req = {};
    const res = { json: jest.fn(), status: jest.fn().mockReturnThis() };

    await getJournalEntries(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(expect.any(Array));
  });
});
