require('dotenv').config();
const express = require('express');
const cors = require('cors');
const port = process.env.PORT || 3000;
const app = express();
const characters = require('./characters/characters.routes');
const authRoute = require('./auth/auth.route');
const userRoute = require('./users/users.route.js');
const swaggerRoute = require('./swagger/swagger.route');
const connectToDatabase = require('./database/database');

app.use(cors());
app.use(express.json());

connectToDatabase();

app.get('/', (req, res) => {
  res.send({ message: 'Hello, world!' });
});

app.use('/users', userRoute);
app.use('/characters', characters);
app.use('/auth', authRoute);
app.use('/api-docs', swaggerRoute);

app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});
