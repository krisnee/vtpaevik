const { Sequelize, DataTypes } = require('sequelize');
const dotenv = require('dotenv');

dotenv.config();

// Andmebaasi ühenduse loomine
const sequelize = new Sequelize(
  process.env.DB_DATANAME || 'vtpaevik',
  process.env.DB_USERNAME || 'd129002_krisnee',
  process.env.DB_PASSWORD || '',
  {
    host: process.env.DB_HOSTNAME || 'd129002.mysql.zonevs.eu',
    dialect: 'mariadb',
    logging: console.log, // Muuda false, kui ei soovi logida SQL päringuid
    pool: {
      max: 5, // Maksimaalne ühenduste arv kogumis
      min: 0, // Minimaalne ühenduste arv kogumis
      acquire: 30000, // Maksimaalne aeg millisekundites, mille jooksul saab ühendust enne vea tekkimist hankida
      idle: 10000 // Maksimaalne aeg millisekundites, mille jooksul võib ühendus jõude seista enne vabastamist
    },
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
    process.exit(1);
  }
};

// Ekspordi Sequelize, DataTypes ja ühendus
const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;
db.connectDB = connectDB;

module.exports = db;