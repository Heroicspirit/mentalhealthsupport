import { sequelize } from '../database/index.js';
import Journal from '../models/journal/journalModel.js';

describe('Journal Model Tests', () => {
  beforeAll(async () => {
    await sequelize.sync({ force: true });
  });

  test('Create a Journal Entry', async () => {
    const journal = await Journal.create({ userId: 1, content: 'First journal entry.' });
    expect(journal.id).toBeDefined();
  });

  test('Fetch Journal Entry', async () => {
    const journal = await Journal.findOne({ where: { userId: 1 } });
    expect(journal).not.toBeNull();
    expect(journal.content).toBe('First journal entry.');
  });
});
