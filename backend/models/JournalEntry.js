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
  activities: {
    type: DataTypes.TEXT, // JSON string tegevuste jaoks
    allowNull: true,
    get() {
      const rawValue = this.getDataValue('activities');
      return rawValue ? JSON.parse(rawValue) : [];
    },
    set(value) {
      this.setDataValue('activities', value ? JSON.stringify(value) : null);
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
        activities: entryData.activities,
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

    // Põhiandmed (keskmised ja kokku)
    const basicStats = await JournalEntry.findAll({
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

    // Päevade kaupa andmed graafiku jaoks
    const dailyEntries = await JournalEntry.findAll({
      where: {
        user_id: userId,
        date: {
          [db.Sequelize.Op.between]: [startDate, endDate]
        }
      },
      attributes: ['date', 'mood_rating', 'sleep_quality', 'activities'],
      order: [['date', 'ASC']],
      raw: true
    });

    // Tegevuste statistika
    const activitiesCount = {};
    dailyEntries.forEach(entry => {
      if (entry.activities) {
        const activities = typeof entry.activities === 'string' 
          ? JSON.parse(entry.activities) 
          : entry.activities;
          
        if (Array.isArray(activities)) {
          activities.forEach(activity => {
            activitiesCount[activity] = (activitiesCount[activity] || 0) + 1;
          });
        }
      }
    });

    // Meeleolu ja une graafiku andmed
    const moodData = dailyEntries.map(entry => ({
      date: entry.date,
      value: entry.mood_rating
    }));

    const sleepData = dailyEntries.map(entry => ({
      date: entry.date,
      value: entry.sleep_quality
    }));

    return {
      basicStats: basicStats[0] || { avg_mood: 0, avg_sleep: 0, total_entries: 0 },
      activitiesCount,
      moodData,
      sleepData,
      dailyEntries
    };
  } catch (error) {
    console.error('Viga kuu statistika koostamisel:', error);
    throw error;
  }
};

// Aasta statistika
JournalEntry.getYearlyStats = async function(userId, year) {
  try {
    const startDate = new Date(year, 0, 1);
    const endDate = new Date(year, 11, 31);

    // Kuude kaupa statistika
    const monthlyStats = [];
    
    for (let month = 0; month < 12; month++) {
      const monthStartDate = new Date(year, month, 1);
      const monthEndDate = new Date(year, month + 1, 0);
      
      const stats = await JournalEntry.findAll({
        where: {
          user_id: userId,
          date: {
            [db.Sequelize.Op.between]: [monthStartDate, monthEndDate]
          }
        },
        attributes: [
          [db.sequelize.fn('AVG', db.sequelize.col('mood_rating')), 'avg_mood'],
          [db.sequelize.fn('AVG', db.sequelize.col('sleep_quality')), 'avg_sleep'],
          [db.sequelize.fn('COUNT', db.sequelize.col('id')), 'entry_count']
        ],
        raw: true
      });
      
      monthlyStats.push({
        month: month + 1,
        avg_mood: stats[0].avg_mood || 0,
        avg_sleep: stats[0].avg_sleep || 0,
        entry_count: stats[0].entry_count || 0
      });
    }

    // Aasta kokkuvõte
    const yearSummary = await JournalEntry.findAll({
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

    return {
      yearSummary: yearSummary[0] || { avg_mood: 0, avg_sleep: 0, total_entries: 0 },
      monthlyStats
    };
  } catch (error) {
    console.error('Viga aasta statistika koostamisel:', error);
    throw error;
  }
};

// Meeleolu trendid
JournalEntry.getMoodTrends = async function(userId, startDate, endDate) {
  try {
    const entries = await JournalEntry.findAll({
      where: {
        user_id: userId,
        date: {
          [db.Sequelize.Op.between]: [startDate, endDate]
        }
      },
      attributes: ['date', 'mood_rating'],
      order: [['date', 'ASC']],
      raw: true
    });

    // Arvutame 7-päeva libiseva keskmise
    const movingAverages = [];
    for (let i = 6; i < entries.length; i++) {
      const weekEntries = entries.slice(i - 6, i + 1);
      const sum = weekEntries.reduce((acc, entry) => acc + entry.mood_rating, 0);
      const avg = sum / 7;
      
      movingAverages.push({
        date: entries[i].date,
        value: avg
      });
    }

    return {
      dailyMood: entries.map(entry => ({
        date: entry.date,
        value: entry.mood_rating
      })),
      weeklyAverage: movingAverages
    };
  } catch (error) {
    console.error('Viga meeleolu trendide koostamisel:', error);
    throw error;
  }
};

module.exports = JournalEntry;