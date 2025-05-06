const { DataTypes } = require('sequelize');
const db = require('../config/db');
const bcrypt = require('bcrypt');

const User = db.sequelize.define('User', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  username: {
    type: DataTypes.STRING(50),
    allowNull: false,  // This means username cannot be null
    unique: true
  },
  email: {
    type: DataTypes.STRING(100),
    allowNull: false,
    unique: true,
    validate: {
      isEmail: true
    }
  },
  password: {
    type: DataTypes.STRING(100),
    allowNull: false
  }
}, {
  tableName: 'users',
  timestamps: true,
  createdAt: 'created_at',
  updatedAt: 'updated_at'
});

User.createTable = async function() {
  try {
    await User.sync({ force: false });
    console.log('Kasutajate tabel loodud või juba olemas');
  } catch (error) {
    console.error('Viga kasutajate tabeli loomisel:', error);
    throw error;
  }
};

User.createUser = async function(userData) {
  try {
    const user = await User.create(userData);
    return user.id;
  } catch (error) {
    console.error('Viga kasutaja loomisel:', error);
    throw error;
  }
};

User.findByEmail = async function(email) {
  try {
    return await User.findOne({ where: { email } });
  } catch (error) {
    console.error('Viga kasutaja otsimisel:', error);
    throw error;
  }
};

User.findById = async function(id) {
  try {
    return await User.findByPk(id, {
      attributes: ['id', 'username', 'email', 'created_at']
    });
  } catch (error) {
    console.error('Viga kasutaja otsimisel:', error);
    throw error;
  }
};

User.beforeCreate(async (user) => {
  const salt = await bcrypt.genSalt(10);
  user.password = await bcrypt.hash(user.password, salt);
});

module.exports = User;