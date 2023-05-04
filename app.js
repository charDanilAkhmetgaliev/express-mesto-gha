// packages imports
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const helmet = require('helmet');
const { errors, celebrate, Joi } = require('celebrate');
// middlewares imports
const limiter = require('./midlewares/limiter');
const auth = require('./midlewares/auth');
// controllers imports
const { login, createUser } = require('./controllers/users');
const { handlerError } = require('./scripts/utils/errors');
// errors
const ObjectNotFoundError = require('./scripts/components/errors/ObjectNotFoundError');
// celebrate schemas
const { regExpEmail, regExpPassword, regExpLink } = require('./scripts/utils/constants');
// initialize project
require('dotenv').config();

const app = express();
const { PORT = 3000 } = process.env;

// mongoDB server connecting
mongoose.connect('mongodb://localhost:27017/mestodb');

// protect and parse
app.use(limiter);
app.use(helmet());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// authentication
app.post('/signin', celebrate({
  body: Joi.object().keys({
    email: Joi.string().regex(regExpEmail).required(),
    password: Joi.string().regex(regExpPassword).required(),
  }),
}), login);
// register
app.post('/signup', celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
    avatar: Joi.string().regex(regExpLink),
    email: Joi.string().regex(regExpEmail).required(),
    password: Joi.string().regex(regExpPassword).required(),
  }),
}), createUser);
// authorization
app.use(auth);

// routing
app.use('/users', require('./routes/users'));
app.use('/cards', require('./routes/cards'));

// handler wrong url
app.use(() => {
  throw new ObjectNotFoundError('Страница не найдена');
});
// handler celebrate errors
app.use(errors());
// handler errors
app.use((err, req, res, next) => handlerError(err, res));

// start server on the port
app.listen(PORT, () => {
  console.log('Server is working!');
  console.log(`Listening on port: ${PORT}`);
  console.log(`url: http://localhost:${PORT}/`);
});
