const express = require('express');
require('dotenv').config();
const cors = require('cors');
const port = 3000;
const app = express();
const characters = require('./src/routes/characters.routes');
const connectToDatabase = require('./src/database/database');

connectToDatabase();

app.use(cors());
app.use(express.json());

app.use('/characters', characters);

app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});
