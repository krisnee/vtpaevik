const db = require('../config/db');
const User = require('./User');
const JournalEntry = require('./JournalEntry');

// Impordi kõik mudelid siin
// ...

async function initializeDatabase() {
  try {
    await db.sequelize.authenticate();
    console.log('MariaDB ühendus edukalt loodud!');
    
    await db.sequelize.sync({ force: false });
    console.log('Kõik andmebaasi tabelid edukalt loodud!');
    
    process.exit(0);
  } catch (error) {
    console.error('Andmebaasi initsialiseerimine ebaõnnestus:', error);
    process.exit(1);
  }
}

initializeDatabase();