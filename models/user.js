const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const AuthorizationError = require('../scripts/components/errors/AuthorizationError');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    minLength: 2,
    maxlength: 30,
    default: 'Жак-Ив Кусто',
  },
  about: {
    type: String,
    minLength: 2,
    maxlength: 30,
    default: 'Исследователь',
  },
  avatar: {
    type: String,
    default: 'https://pictures.s3.yandex.net/resources/jacques-cousteau_1604399756.png',
  },
  email: {
    unique: true,
    required: true,
    type: String,
  },
  password: {
    required: true,
    type: String,
    select: false,
  },
});

userSchema.statics.findUserByCredentials = function findUser(email, password) {
  return this.findOne({ email }).select('+password')
    .then((user) => {
      if (user && user !== null) {
        return bcrypt.compare(password, user.password)
          .then((matched) => {
            if (matched) {
              return user;
            } else {
              throw new AuthorizationError();
            }
          })
      } else {
        throw new AuthorizationError();
      }
    })
};

module.exports = mongoose.model('user', userSchema);
