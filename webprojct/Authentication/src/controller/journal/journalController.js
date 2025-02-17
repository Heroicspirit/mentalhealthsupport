import Journal from '../../models/journal/journalModel.js';

export const createJournalEntry = async (req, res) => {
    try {
        const { date, mood, title, symptoms, entry } = req.body;
        const newJournalEntry = await Journal.create({ 
            date: new Date(date).toISOString().split('T')[0], // Only store the date part
            mood,
            title,
            symptoms,
            entry,
            createdAt: new Date(),
            updatedAt: new Date()
        });
        
        // Return consistent data structure
        const responseData = {
            id: newJournalEntry.id,
            date: newJournalEntry.date,
            mood: newJournalEntry.mood,
            title: newJournalEntry.title,
            symptoms: newJournalEntry.symptoms,
            entry: newJournalEntry.entry,
            createdAt: newJournalEntry.createdAt
        };
        res.status(201).json(responseData);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

export const getJournalEntries = async (req, res) => {
    try {
        const journalEntries = await Journal.findAll();
        res.status(200).json(journalEntries);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

export const updateJournalEntry = async (req, res) => {
    try {
        const { id } = req.params;
        const { date, mood, title, symptoms, entry } = req.body;
        const updatedJournalEntry = await Journal.update(
            { date: new Date(date).toISOString().split('T')[0], mood, title, symptoms, entry }, // Only store the date part
            { where: { id } }
        );
        res.status(200).json({ message: 'Journal entry updated successfully' });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

export const deleteJournalEntry = async (req, res) => {
    try {
        const { id } = req.params;
        await Journal.destroy({ where: { id } });
        res.status(200).json({ message: 'Journal entry deleted successfully' });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};
