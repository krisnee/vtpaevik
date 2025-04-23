const { Sequelize, DataTypes } = require('sequelize');
const dotenv = require('dotenv');

dotenv.config();

// Logime andmebaasi seadistused (ilma paroolita)
console.log('Andmebaasi seadistused:');
console.log('Host:', process.env.DB_HOSTNAME);
console.log('Andmebaas:', process.env.DB_DATANAME);
console.log('Kasutaja:', process.env.DB_USERNAME);

// Andmebaasi ühenduse loomine
const sequelize = new Sequelize(
  process.env.DB_DATANAME || 'vtpaevik',
  process.env.DB_USERNAME || 'd129002_krisnee',
  process.env.DB_PASSWORD || '',
  {
    host: process.env.DB_HOSTNAME || 'd129002.mysql.zonevs.eu',
    dialect: 'mariadb',
    logging: process.env.NODE_ENV === 'development' ? console.log : false, // Logime ainult arenduskeskkonnas
    pool: {
      max: 5, // Maksimaalne ühenduste arv kogumis
      min: 0, // Minimaalne ühenduste arv kogumis
      acquire: 30000, // Maksimaalne aeg millisekundites, mille jooksul saab ühendust enne vea tekkimist hankida
      idle: 10000 // Maksimaalne aeg millisekundites, mille jooksul võib ühendus jõude seista enne vabastamist
    },
    dialectOptions: {
      // Kui teie andmebaas nõuab SSL/TLS ühendust
      ssl: process.env.DB_SSL === 'true' ? {
        require: true,
        rejectUnauthorized: false // Arenduskeskkonnas võib olla vajalik
      } : false
    },
    timezone: '+03:00' // Eesti ajavöönd
  }
);

// Ühenduse testimine funktsioon
const connectDB = async () => {
  try {
    await sequelize.authenticate();
    console.log('MariaDB ühendus edukalt loodud!');
    return sequelize;
  } catch (error) {
    console.error('Viga andmebaasi ühendamisel:', error);
    // Ärge lõpetage protsessi, et saaksite rakendust kasutada ilma andmebaasita
    console.log('Jätkame ilma andmebaasita...');
    return null;
  }
};

// Ühenduse sulgemise funktsioon
const closeConnection = async () => {
  try {
    await sequelize.close();
    console.log('MariaDB ühendus edukalt suletud!');
  } catch (error) {
    console.error('Viga andmebaasi ühenduse sulgemisel:', error);
  }
};

// Tabelite sünkroniseerimise funktsioon
const syncTables = async (force = false, alter = true) => {
  try {
    if (force) {
      await sequelize.sync({ force: true });
      console.log('Kõik tabelid on kustutatud ja uuesti loodud');
    } else if (alter) {
      await sequelize.sync({ alter: true });
      console.log('Tabelid on sünkroniseeritud (alter)');
    } else {
      await sequelize.sync();
      console.log('Tabelid on sünkroniseeritud');
    }
  } catch (error) {
    console.error('Viga tabelite sünkroniseerimisel:', error);
  }
};

// Ekspordi Sequelize, DataTypes ja ühendus
const db = {
  Sequelize,
  DataTypes,
  sequelize,
  connectDB,
  closeConnection,
  syncTables
};

// Ekspordi ainult ühe korra
module.exports = db;