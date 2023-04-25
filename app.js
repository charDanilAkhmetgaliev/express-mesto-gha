const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const { handlerSendError } = require('./scripts/utils/errors');
const ObjectNotFoundError = require('./scripts/utils/ObjectNotFoundError');

const app = express();
const { PORT = 3000 } = process.env;

mongoose.connect('mongodb://localhost:27017/mestodb');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// todo: удалить временную авторизацию
const logger = (req, res, next) => {
  req.user = {
    _id: '64381393100c956e41b7ffb4',
  };

  next();
};

app.use(logger);
app.use('/users', require('./routes/users'));
app.use('/cards', require('./routes/cards'));

app.use((req, res) => {
  handlerSendError(res, new ObjectNotFoundError('Страница не найдена'));
});

app.listen(PORT, () => {
  console.log(`Server listening on port: ${PORT}`);
});
