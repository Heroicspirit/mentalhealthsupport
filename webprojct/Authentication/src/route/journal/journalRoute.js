import express from 'express';
const router = express.Router();
import { createJournalEntry, getJournalEntries, updateJournalEntry, deleteJournalEntry } from '../../controller/journal/journalController.js';

router.post('/', createJournalEntry);
router.get('/', getJournalEntries);
router.put('/:id', updateJournalEntry);
router.delete('/:id', deleteJournalEntry);

export const journalRouter = router;
