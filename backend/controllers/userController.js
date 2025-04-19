const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// Registreerimine
exports.register = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    
    // Kontrolli, kas kasutajanimi ja e-post on juba võetud
    const existingUser = await User.findByEmail(email);
    if (existingUser) {
      return res.status(400).json({ message: 'See e-posti aadress on juba kasutusel' });
    }
    
    // Loo uus kasutaja (kasuta createUser meetodit User.create asemel)
    const userId = await User.createUser({ username, email, password });
    
    // Genereeri JWT
    const token = jwt.sign(
      { id: userId, email: email },
      process.env.JWT_SECRET,
      { expiresIn: '30d' }
    );
    
    res.status(201).json({
      message: 'Kasutaja edukalt loodud',
      token,
      user: {
        id: userId,
        username,
        email
      }
    });
  } catch (error) {
    console.error('Viga registreerimisel:', error);
    res.status(500).json({ message: 'Serveri viga' });
  }
};

// Sisselogimine
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    
    // Leia kasutaja e-posti järgi
    const user = await User.findByEmail(email);
    if (!user) {
      return res.status(400).json({ message: 'Vale e-post või parool' });
    }
    
    // Kontrolli parooli
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Vale e-post või parool' });
    }
    
    // Genereeri JWT
    const token = jwt.sign(
      { id: user.id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: '30d' }
    );
    
    res.json({
      message: 'Sisselogimine õnnestus',
      token,
      user: {
        id: user.id,
        username: user.username,
        email: user.email
      }
    });
  } catch (error) {
    console.error('Viga sisselogimisel:', error);
    res.status(500).json({ message: 'Serveri viga' });
  }
};

// Kasutaja profiili kuvamine
exports.getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).json({ message: 'Kasutajat ei leitud' });
    }
    
    res.json(user);
  } catch (error) {
    console.error('Viga profiili laadimisel:', error);
    res.status(500).json({ message: 'Serveri viga' });
  }
};