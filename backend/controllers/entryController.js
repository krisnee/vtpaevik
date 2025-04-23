const Entry = require('../models/JournalEntry');

// Kõigi kasutaja sissekannete hankimine
exports.getAllEntries = async (req, res) => {
  try {
    // Hangi ainult selle kasutaja sissekanded
    const entries = await Entry.find({ user: req.user.id }).sort({ date: -1 });
    res.json(entries);
  } catch (error) {
    console.error('Viga sissekannete hankimisel:', error);
    res.status(500).json({ message: 'Serveri viga sissekannete hankimisel' });
  }
};

// Ühe sissekande hankimine ID järgi
exports.getEntryById = async (req, res) => {
  try {
    const entry = await Entry.findOne({ 
      _id: req.params.id,
      user: req.user.id 
    });
    
    if (!entry) {
      return res.status(404).json({ message: 'Sissekannet ei leitud' });
    }
    
    res.json(entry);
  } catch (error) {
    console.error('Viga sissekande hankimisel:', error);
    res.status(500).json({ message: 'Serveri viga sissekande hankimisel' });
  }
};

exports.createOrUpdateEntry = async (req, res) => {
  try {
    // Valideerime sisendi
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    
    const { date, mood_rating, sleep_quality, notes } = req.body;
    // Ajutiselt kasutame fikseeritud kasutaja ID-d, kuni autentimine on seadistatud
    const user_id = req.user?.id || 1; // Vaikimisi kasutaja ID 1
    
    // Ülejäänud kood jääb samaks...
  } catch (error) {
    console.error('Viga päeviku sissekande salvestamisel:', error);
    res.status(500).json({ message: 'Serveri viga' });
  }
};

// Sissekande kustutamine
exports.deleteEntry = async (req, res) => {
  try {
    const deletedEntry = await Entry.findOneAndDelete({
      _id: req.params.id,
      user: req.user.id
    });
    
    if (!deletedEntry) {
      return res.status(404).json({ message: 'Sissekannet ei leitud' });
    }
    
    res.json({ message: 'Sissekanne edukalt kustutatud' });
  } catch (error) {
    console.error('Viga sissekande kustutamisel:', error);
    res.status(500).json({ message: 'Serveri viga sissekande kustutamisel' });
  }
};