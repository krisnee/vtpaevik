// ----------------------
// AUTENTIMISE KONTROLLER (AUTH CONTROLLER)
// ----------------------
// Kasutajate registreerimise ja sisselogimise loogika
// ----------------------

const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// KASUTAJA REGISTREERIMINE
// Loob uue kasutaja ja tagastab JWT tokeni
exports.register = async (req, res) => {
  try {
    console.log('Registreerimise päring:', req.body);
    
    const { username, email, password } = req.body;
    
    // Kontrolli JWT_SECRET olemasolu
    if (!process.env.JWT_SECRET) {
      console.error('JWT_SECRET puudub .env failis');
      return res.status(500).json({ message: 'Serveri seadistuse viga: JWT_SECRET puudub' });
    }
    
    console.log('Kontrollin, kas e-post on juba võetud:', email);
    // Kontrolli, kas e-post on juba võetud
    try {
      const existingUser = await User.findByEmail(email);
      console.log('Olemasolev kasutaja:', existingUser ? 'leitud' : 'ei leitud');
      
      if (existingUser) {
        return res.status(400).json({ message: 'See e-posti aadress on juba kasutusel' });
      }
    } catch (findError) {
      console.error('Viga e-posti otsimisel:', findError);
      return res.status(500).json({ message: 'Viga kasutaja otsimisel' });
    }
    
    console.log('Loon uue kasutaja');
    // Loo uus kasutaja
    try {
      const userId = await User.createUser({ 
        username, 
        email, 
        password 
      });
      
      console.log('Kasutaja loodud ID-ga:', userId);
      
      // Genereeri JWT
      const token = jwt.sign(
        { id: userId, email: email },
        process.env.JWT_SECRET,
        { expiresIn: '30d' }
      );
      
      return res.status(201).json({
        message: 'Kasutaja edukalt loodud',
        token,
        user: {
          id: userId,
          username,
          email
        }
      });
    } catch (createError) {
      console.error('Viga kasutaja loomisel:', createError);
      return res.status(500).json({ message: 'Viga kasutaja loomisel: ' + createError.message });
    }
  } catch (error) {
    console.error('Viga registreerimisel:', error);
    return res.status(500).json({ message: 'Serveri viga: ' + error.message });
  }
};

// KASUTAJA SISSELOGIMINE
// Kontrollib kasutaja andmeid ja tagastab JWT tokeni
exports.login = async (req, res) => {
  try {
    console.log('Sisselogimise päring:', req.body);
    
    const { email, password } = req.body;
    
    // Kontrolli JWT_SECRET olemasolu
    if (!process.env.JWT_SECRET) {
      console.error('JWT_SECRET puudub .env failis');
      return res.status(500).json({ message: 'Serveri seadistuse viga: JWT_SECRET puudub' });
    }
    
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
    
    // Genereeri JWT token
    const token = jwt.sign(
      { id: user.id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: '30d' }
    );
    
    // Tagasta eduka sisselogimise vastus
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