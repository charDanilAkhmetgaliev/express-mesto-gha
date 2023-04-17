const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const app = express();
const { PORT = 3000 } = process.env;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

mongoose.connect('mongodb://localhost:27017/mestodb');
// todo: удалить временную авторизацию
module.exports.tempAuth = (req, res, next) => {
  req.user = {
    _id: '64381393100c956e41b7ffb',
  };

  next();
};

app.use('/users', require('./routes/users'));
app.use('/cards', require('./routes/cards'));

app.listen(PORT, () => {
  console.log(`Server listening on port: ${PORT}`);
});
