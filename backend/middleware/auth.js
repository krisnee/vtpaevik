const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  // Token võetakse Authorization päisest
  const token = req.header('Authorization')?.replace('Bearer ', '');
  
  if (!token) {
    return res.status(401).json({ message: 'Autentimine ebaõnnestus, token puudub' });
  }
  
  try {
    // Tokeni verifitseerimine
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    
    // Lisame kasutaja info päringule
    req.user = decoded;
    next();
  } catch (error) {
    console.error('Tokeni verifitseerimine ebaõnnestus:', error);
    res.status(401).json({ message: 'Autentimine ebaõnnestus, kehtetu token' });
  }
};