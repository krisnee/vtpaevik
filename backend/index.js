// IMPORTID
const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const bodyParser = require('body-parser');
const swaggerUi = require('swagger-ui-express');
const YAML = require('yamljs');
const db = require('./config/db');

// Marsruutide importimine
const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');
const journalRoutes = require('./routes/journalRoutes');
const entryRoutes = require('./routes/entryRoutes');

// SEADISTUSED
// 1. Keskkonna muutujate laadimine .env failist
dotenv.config();

// Keskkonna muutujate olemasolu kontroll
// Logime konsooli, kas kõik vajalikud muutujad on olemas
console.log('JWT_SECRET olemas:', !!process.env.JWT_SECRET);
console.log('DB seadistused olemas:', {
  host: !!process.env.DB_HOSTNAME,
  user: !!process.env.DB_USERNAME,
  db: !!process.env.DB_DATANAME,
  // parooli ei logi turvalisuse huvides
});

// Express rakenduse loomine
const app = express();
// Swagger dokumentatsiooni laadimine
const swaggerDocument = YAML.load('./docs/swagger.yaml');

// MIDDLEWARE SEADISTUSED
// 1. Logimine
app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.originalUrl}`);
  next();
});

// 2. Päringu keha parsijad
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// 3. CORS seadistused
app.use(cors({
  origin: 'http://localhost:3000',   // origin: '*', // Lubame kõik päritolud (arenduskeskkonnas)
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true // Lisame, kui kasutame küpsiseid
}));

// 4. Swagger API dokumentatsioon
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// API MARSRUUDID
// Põhiteekond
app.get('/', (req, res) => {
  res.send('Vaimse tervise päeviku API töötab!');
});

// API marsruutide defineerimine
app.use('/api/auth', authRoutes);        // Autentimisega seotud marsruudid
app.use('/api/users', userRoutes);       // Kasutajaga seotud marsruudid
app.use('/api/journal', journalRoutes);  // Päeviku marsruudid
app.use('/api/entries', entryRoutes);    // Sissekannete marsruudid

// TESTIMISE ENDPOINT-ID
// NB! Eemaldada pärast arenduse lõppu
app.post('/api/test/entries', (req, res) => {
  console.log('Saadud andmed:', req.body);
  res.status(201).json({ 
    message: 'Päeviku sissekanne edukalt salvestatud',
    id: 1,
    data: req.body
  });
});

// VEAKÄSITLEJAD (peavad olema kõige viimasena)
// 1. 404 käsitleja - tundmatu marsruudi jaoks
app.use((req, res) => {
  res.status(404).json({ message: 'Lehte ei leitud' });
});

// 2. Üldine veakäsitleja
app.use((err, req, res, next) => {
  console.error('Serveri viga:', err);
  res.status(500).json({
    message: 'Serveri viga',
    error: process.env.NODE_ENV === 'development' ? err.message : undefined
  });
});

// SERVERI KÄIVITAMINE
const PORT = process.env.PORT || 8080;

const startServer = async () => {
  try {
    // Andmebaasiga ühenduse loomine
    await db.connectDB();
    
    // Andmebaasi tabelite sünkroniseerimine
    await db.syncTables(false, true); // force=false, alter=true
    
    // Serveri käivitamine
    app.listen(PORT, () => {
      console.log(`Server töötab pordil http://localhost:${PORT}`);
      console.log(`Swagger dokumentatsioon: http://localhost:${PORT}/api-docs`);
    });
  } catch (error) {
    console.error('Serveri käivitamine ebaõnnestus:', error);
  }
};

startServer();