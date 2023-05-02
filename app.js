// packages imports
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const helmet = require('helmet');
// middlewares imports
const limiter = require('./midlewares/limiter');
const PageNotFoundHandler = require('./midlewares/PageNotFound');
const startLogger = require('./midlewares/startLogger');
const auth = require('./midlewares/auth');
// controllers imports
const { login, createUser } = require('./controllers/users');

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

// authorization
app.post('/signin', login);
app.post('/signup', createUser);
app.use(auth);

// routing
app.use('/users', require('./routes/users'));
app.use('/cards', require('./routes/cards'));

// handle wrong url
app.use((req, res) => PageNotFoundHandler(res));

// start server on the port
app.listen(PORT, () => startLogger(PORT));
