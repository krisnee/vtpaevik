// ----------------------
// KASUTAJAMUDEL (USER MODEL)
// ----------------------
// Kasutajate andmete struktuur ja andmebaasi operatsioonid
// ----------------------

const { DataTypes } = require('sequelize');
const db = require('../config/db');
const bcrypt = require('bcrypt');

// MUDELI DEFINITSIOON
// Määratleme kasutaja mudeli koos kõigi vajalike väljadega
const User = db.sequelize.define('User', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  username: {
    type: DataTypes.STRING(50),
    allowNull: false,   // Kasutajanimi peab olema täidetud
    unique: true        // Kasutajanimi peab olema unikaalne
  },
  email: {
    type: DataTypes.STRING(100),
    allowNull: false,
    unique: true,       // E-post peab olema unikaalne
    validate: {
      isEmail: true     // Automaatne e-posti formaadi valideerimine
    }
  },
  password: {
    type: DataTypes.STRING(100),
    allowNull: false
  }
}, {
  tableName: 'users',   // Andmebaasi tabeli nimi
  timestamps: true,     // Lisame automaatselt loomise ja muutmise ajatemplid
  createdAt: 'created_at',
  updatedAt: 'updated_at'
});

// HOOK PAROOLIDE HASHIMISEKS
// Enne kasutaja loomist hashime parooli automaatselt
User.beforeCreate(async (user) => {
  const salt = await bcrypt.genSalt(10);
  user.password = await bcrypt.hash(user.password, salt);
});

// TABELI LOOMINE/KONTROLLIMINE
// Loob kasutajate tabeli, kui seda veel ei eksisteeri
User.createTable = async function() {
  try {
    await User.sync({ force: false });  // force: false - ei kustuta olemasolevat tabelit
    console.log('Kasutajate tabel loodud või juba olemas');
  } catch (error) {
    console.error('Viga kasutajate tabeli loomisel:', error);
    throw error;
  }
};

// KASUTAJA LOOMINE
// Loob uue kasutaja andmebaasi ja tagastab tema ID
User.createUser = async function(userData) {
  try {
    console.log('Loon kasutaja:', {
      username: userData.username,
      email: userData.email
      // Parooli ei logi turvalisuse kaalutlustel
    });
    
    const user = await User.create(userData);
    console.log('Kasutaja loodud ID-ga:', user.id);
    return user.id;
  } catch (error) {
    console.error('Viga kasutaja loomisel:', error);
    // Täpsemate veateadete logimine
    if (error.name === 'SequelizeValidationError') {
      console.error('Valideerimise viga:', error.errors);
    } else if (error.name === 'SequelizeUniqueConstraintError') {
      console.error('Unikaalsuse piirangu viga:', error.errors);
    }
    throw error;
  }
};

// KASUTAJA LEIDMINE E-POSTI JÄRGI
// Otsib kasutaja andmebaasist e-posti järgi
User.findByEmail = async function(email) {
  try {
    return await User.findOne({ where: { email } });
  } catch (error) {
    console.error('Viga kasutaja otsimisel e-posti järgi:', error);
    throw error;
  }
};

// KASUTAJA LEIDMINE ID JÄRGI
// Otsib kasutaja andmebaasist ID järgi, tagastab piiratud info
User.findById = async function(id) {
  try {
    return await User.findByPk(id, {
      attributes: ['id', 'username', 'email', 'created_at']
      // Parooli ei tagastata turvalisuse kaalutlustel
    });
  } catch (error) {
    console.error('Viga kasutaja otsimisel ID järgi:', error);
    throw error;
  }
};

module.exports = User;