// ----------------------
// KASUTAJA KONTROLLER (USER CONTROLLER)
// ----------------------
// Kasutajate haldamise loogika - registreerimine, sisselogimine, profiil
// ----------------------

const User = require('../models/User');

// KASUTAJA PROFIILI KUVAMINE
// Tagastab sisseloginud kasutaja profiiliandmed
exports.getProfile = async (req, res) => {
  try {
    // req.user on lisatud auth middleware poolt
    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).json({ message: 'Kasutajat ei leitud' });
    }
    
    // Tagasta kasutaja andmed
    res.json(user);
  } catch (error) {
    console.error('Viga profiili laadimisel:', error);
    res.status(500).json({ message: 'Serveri viga' });
  }
};

// Siia võid lisada teisi kasutajaga seotud meetodeid
// näiteks profiili muutmine, parooli vahetamine jne