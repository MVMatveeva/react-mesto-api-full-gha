const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const { errors } = require('celebrate');
const router = require('./routes');
const { handleErrorCentralized } = require('./middlewares/handleErrorCentralized');
const { requestLogger, errorLogger } = require('./middlewares/logger');

const { PORT = 3000 } = process.env;
const app = express();

const allowedCors = [
  'https://mesto.matveeva.nomoredomainsmonster.ru',
  'http://mesto.matveeva.nomoredomainsmonster.ru',
  'localhost:3000',
  'localhost:3001',
];

app.use(cors(allowedCors));

mongoose.connect('mongodb://127.0.0.1:27017/mestodb');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(requestLogger);

app.use(router);

app.use(errorLogger);

app.use(errors());

app.use(handleErrorCentralized);

app.listen(PORT, () => {
  console.log('Ссылка на сервер');
});
