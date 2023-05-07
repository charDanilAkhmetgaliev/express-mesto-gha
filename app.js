// packages imports
const express = require('express');
const mongoose = require('mongoose');
const helmet = require('helmet');
const { errors, celebrate } = require('celebrate');
const cookieParser = require('cookie-parser');
// middlewares imports
const limiter = require('./midlewares/limiter');
const auth = require('./midlewares/auth');
// controllers imports
const { login, createUser } = require('./controllers/users');
const { handlerError } = require('./scripts/utils/errors');
// errors
const ObjectNotFoundError = require('./scripts/components/errors/ObjectNotFoundError');
// celebrate schemas
const { schemaBodySignUp, schemaBodySignIn } = require('./scripts/utils/clbSchemas');
const { JWT_SECRET } = require('./scripts/utils/constants');
// initialize project
require('dotenv').config();

const app = express();
const { PORT = 3000 } = process.env;

// mongoDB server connecting
mongoose.connect('mongodb://localhost:27017/mestodb');

// protect and parse
app.use(limiter);
app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser(JWT_SECRET));

// authentication
app.post('/signin', celebrate({
  body: schemaBodySignIn,
}), login);
// register
app.post('/signup', celebrate({
  body: schemaBodySignUp,
}), createUser);
// authorization
app.use(auth);

// routing
app.use('/users', require('./routes/users'));
app.use('/cards', require('./routes/cards'));

// handler wrong url
app.use((req, res) => handlerError(new ObjectNotFoundError('Страница не найдена'), res));
// handler celebrate errors
app.use(errors());
// handler errors
app.use((err, req, res, next) => handlerError(err, res, next));

// start server on the port
app.listen(PORT);
