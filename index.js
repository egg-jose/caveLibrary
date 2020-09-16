const express = require('express');

const books = require('./routes/book');

const app = express();

require('dotenv').config();
const port = process.env.PORT || 3000;

app.use(express.json());

const db = require('./config/database');
db.on('error', (error) => console.error(error));
db.once('open', () => console.log('Connected to Mongoose'));

app.use('/books', books);

app.listen(port, () => console.log(`http://localhost:${port}`));
