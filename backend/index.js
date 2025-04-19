const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
 const db = require('./config/db.js');

dotenv.config();

const app = express();

const PORT = process.env.PORT || 8081;

 db.connectDB();

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.send('Vaimse tervise päeviku API töötab!')
});

app.listen(PORT, () => {
  console.log(`Server töötab pordil  http://localhost:${PORT}`)
});