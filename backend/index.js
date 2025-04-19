const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const db = require('./config/db');

const userRoutes = require('./routes/userRoutes');

dotenv.config();

const app = express();

const PORT = process.env.PORT || 8081;

db.sequelize.authenticate()
  .then(() => {
    console.log('MariaDB ühendus edukalt loodud!');
  })
  .catch(err => {
    console.error('Viga andmebaasi ühendamisel:', err);
  });

app.use(cors());
app.use(express.json());

app.use('/api/users', userRoutes);

app.get('/', (req, res) => {
  res.send('Vaimse tervise päeviku API töötab!')
});

app.listen(PORT, () => {
  console.log(`Server töötab pordil  http://localhost:${PORT}`)
});