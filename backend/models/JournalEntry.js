const { DataTypes } = require('sequelize');
const db = require('../config/db');
const User = require('./User');

// Mudeli defineerimine
const JournalEntry = db.sequelize.define('JournalEntry', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  user_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'users',
      key: 'id'
    }
  },
  date: {
    type: DataTypes.DATEONLY,
    allowNull: false
  },
  mood_rating: {
    type: DataTypes.INTEGER,
    allowNull: false,
    validate: {
      min: 1,
      max: 5
    }
  },
  sleep_quality: {
    type: DataTypes.INTEGER,
    allowNull: true,
    validate: {
      min: 1,
      max: 5
    }
  },
  notes: {
    type: DataTypes.TEXT,
    allowNull: true
  }
}, {
  tableName: 'journal_entries',
  timestamps: true,
  createdAt: 'created_at',
  updatedAt: 'updated_at',
  indexes: [
    {
      unique: true,
      fields: ['user_id', 'date']
    }
  ]
});

// Seosed
JournalEntry.belongsTo(User, {
  foreignKey: 'user_id',
  onDelete: 'CASCADE'
});

// Staatilised meetodid
JournalEntry.createTable = async function() {
  try {
    await JournalEntry.sync({ force: false });
    console.log('Päeviku sisestuste tabel loodud või juba olemas');
  } catch (error) {
    console.error('Viga päeviku sisestuste tabeli loomisel:', error);
    throw error;
  }
};

JournalEntry.createEntry = async function(entryData) {
  try {
    const [entry, created] = await JournalEntry.findOrCreate({
      where: {
        user_id: entryData.user_id,
        date: entryData.date
      },
      defaults: entryData
    });

    if (!created) {
      // Kui kirje juba eksisteerib, uuenda seda
      await entry.update({
        mood_rating: entryData.mood_rating,
        sleep_quality: entryData.sleep_quality,
        notes: entryData.notes
      });
    }

    return entry.id;
  } catch (error) {
    console.error('Viga päeviku sisestuse loomisel:', error);
    throw error;
  }
};

JournalEntry.findByUserIdAndDate = async function(userId, date) {
  try {
    return await JournalEntry.findOne({
      where: {
        user_id: userId,
        date: date
      }
    });
  } catch (error) {
    console.error('Viga päeviku sisestuse otsimisel:', error);
    throw error;
  }
};

JournalEntry.findByUserId = async function(userId, limit = 30) {
  try {
    return await JournalEntry.findAll({
      where: {
        user_id: userId
      },
      order: [['date', 'DESC']],
      limit: limit
    });
  } catch (error) {
    console.error('Viga päeviku sisestuste otsimisel:', error);
    throw error;
  }
};

JournalEntry.getMonthlyStats = async function(userId, year, month) {
  try {
    const startDate = new Date(year, month - 1, 1);
    const endDate = new Date(year, month, 0);

    const entries = await JournalEntry.findAll({
      where: {
        user_id: userId,
        date: {
          [db.Sequelize.Op.between]: [startDate, endDate]
        }
      },
      attributes: [
        [db.sequelize.fn('AVG', db.sequelize.col('mood_rating')), 'avg_mood'],
        [db.sequelize.fn('AVG', db.sequelize.col('sleep_quality')), 'avg_sleep'],
        [db.sequelize.fn('COUNT', db.sequelize.col('id')), 'total_entries']
      ],
      raw: true
    });

    return entries[0];
  } catch (error) {
    console.error('Viga kuu statistika koostamisel:', error);
    throw error;
  }
};

module.exports = JournalEntry;