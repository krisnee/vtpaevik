const JournalEntry = require('../models/JournalEntry');

// Päeviku sisestuse loomine või uuendamine
exports.createOrUpdateEntry = async (req, res) => {
  try {
    const { date, mood_rating, sleep_quality, notes } = req.body;
    const user_id = req.user.id;
    
    // Valideeri sisend
    if (!date || !mood_rating || mood_rating < 1 || mood_rating > 5) {
      return res.status(400).json({ message: 'Palun sisesta kehtiv kuupäev ja meeleolu hinnang (1-5)' });
    }
    
    const entryData = {
      user_id,
      date,
      mood_rating,
      sleep_quality: sleep_quality || null,
      notes: notes || ''
    };
    
    const result = await JournalEntry.create(entryData);
    
    res.status(201).json({
      message: 'Päeviku sissekanne edukalt salvestatud',
      id: result
    });
  } catch (error) {
    console.error('Viga päeviku sissekande salvestamisel:', error);
    res.status(500).json({ message: 'Serveri viga' });
  }
};

// Päeviku sisestuse leidmine kuupäeva järgi
exports.getEntryByDate = async (req, res) => {
  try {
    const { date } = req.params;
    const user_id = req.user.id;
    
    const entry = await JournalEntry.findByUserIdAndDate(user_id, date);
    
    if (!entry) {
      return res.status(404).json({ message: 'Sissekanne sellel kuupäeval puudub' });
    }
    
    res.json(entry);
  } catch (error) {
    console.error('Viga päeviku sissekande otsimisel:', error);
    res.status(500).json({ message: 'Serveri viga' });
  }
};

// Kasutaja viimaste sisestuste leidmine
exports.getRecentEntries = async (req, res) => {
  try {
    const user_id = req.user.id;
    const limit = parseInt(req.query.limit) || 30;
    
    const entries = await JournalEntry.findByUserId(user_id, limit);
    
    res.json(entries);
  } catch (error) {
    console.error('Viga päeviku sissekannete otsimisel:', error);
    res.status(500).json({ message: 'Serveri viga' });
  }
};

// Kuu statistika
exports.getMonthlyStats = async (req, res) => {
  try {
    const user_id = req.user.id;
    const { year, month } = req.params;
    
    if (!year || !month || isNaN(year) || isNaN(month)) {
      return res.status(400).json({ message: 'Palun sisesta kehtiv aasta ja kuu' });
    }
    
    const stats = await JournalEntry.getMonthlyStats(user_id, year, month);
    
    res.json(stats);
  } catch (error) {
    console.error('Viga kuu statistika laadimisel:', error);
    res.status(500).json({ message: 'Serveri viga' });
  }
};