// ----------------------
// AUTENTIMISE MIDDLEWARE
// ----------------------
// Kontrollib, kas päringuga on kaasas kehtiv JWT token
// ----------------------

const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  try {
    // Tokeni võtmine päise Authorization väljast
    const token = req.header('Authorization')?.replace('Bearer ', '');
    
    // Kontrolli, kas token on olemas
    if (!token) {
      return res.status(401).json({ message: 'Autentimine ebaõnnestus, token puudub' });
    }
    
    // Kontrolli JWT_SECRET olemasolu
    if (!process.env.JWT_SECRET) {
      console.error('JWT_SECRET puudub .env failis');
      return res.status(500).json({ message: 'Serveri seadistuse viga' });
    }
    
    // Tokeni verifitseerimine
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      
      // Lisame kasutaja info päringule
      req.user = decoded;
      next();
    } catch (jwtError) {
      console.error('Tokeni verifitseerimine ebaõnnestus:', jwtError);
      return res.status(401).json({ message: 'Autentimine ebaõnnestus, kehtetu token' });
    }
  } catch (error) {
    console.error('Viga autentimisel:', error);
    res.status(500).json({ message: 'Serveri viga' });
  }
};