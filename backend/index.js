const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const db = require('./config/db');

const userRoutes = require('./routes/userRoutes');
const journalRoutes = require('./routes/journalRoutes');
const entryRoutes = require('./routes/entryRoutes');
const swaggerUi = require('swagger-ui-express');
const YAML = require('yamljs');
const swaggerDocument = YAML.load('./docs/swagger.yaml');

dotenv.config();

const app = express();

// CORS ja JSON-i tugi
app.use(cors({
  origin: '*', // Lubame kõik päritolud (arenduskeskkonnas)
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(express.json());

// Preflight päringute käsitlemine
app.options('*', cors());

// Swaggeri seadistamine
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Põhiteekond
app.get('/', (req, res) => {
  res.send('Vaimse tervise päeviku API töötab!');
});

// API teekonnad
app.use('/api/users', userRoutes);
app.use('/api/journal', journalRoutes);
app.use('/api/entries', entryRoutes);

// Testhambad andmete jaoks, kui puudub päris andmebaas
// NB! Eemaldada või asendada pärast andmebaasi integratsiooni
app.post('/api/test/entries', (req, res) => {
  console.log('Saadud andmed:', req.body);
  res.status(201).json({ 
    message: 'Päeviku sissekanne edukalt salvestatud',
    id: 1,
    data: req.body
  });
});

app.get('/api/test/entries', (req, res) => {
  res.json([
    { 
      id: 1, 
      date: '2023-05-01', 
      mood_rating: 8, 
      sleep_quality: 7, 
      notes: 'Hea päev' 
    },
    { 
      id: 2, 
      date: '2023-05-02', 
      mood_rating: 6, 
      sleep_quality: 5, 
      notes: 'Keskmine päev' 
    }
  ]);
});

// 404 käsitleja - peab olema pärast kõiki marsruute
app.use((req, res) => {
  res.status(404).json({ message: 'Lehte ei leitud' });
});

// Üldine veakäsitleja - peab olema kõige viimane middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    message: 'Serveri viga',
    error: process.env.NODE_ENV === 'development' ? err.message : undefined
  });
});

// Serveri käivitamine
const PORT = process.env.PORT || 8080;

const startServer = async () => {
  try {
    // Proovime andmebaasiga ühendust luua
    await db.connectDB();
    
    // Sünkroniseerime andmebaasi tabelid (kui kasutad Sequelize'i)
    // Kommenteeri välja, kui tabeleid pole vaja sünkroniseerida
    await db.syncTables(false, true); // force=false, alter=true
    
    app.listen(PORT, () => {
      console.log(`Server töötab pordil http://localhost:${PORT}`);
      console.log(`Swagger dokumentatsioon: http://localhost:${PORT}/api-docs`);
    });
  } catch (error) {
    console.error('Serveri käivitamine ebaõnnestus:', error);
  }
};

startServer();