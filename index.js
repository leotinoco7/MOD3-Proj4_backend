require('dotenv').config();
const express = require('express');
const cors = require('cors');
const port = process.env.PORT || 3000;
const app = express();
const characters = require('./src/characters/characters.routes');
const authRoute = require('.auth/auth.route');
const connectToDatabase = require('./src/database/database');

app.use(cors());
app.use(express.json());

connectToDatabase();

app.get('/', (req, res) => {
  res.send({ message: 'Hello, world!' });
});

app.use('/characters', characters);
app.use('/auth', authRoute);

app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});
