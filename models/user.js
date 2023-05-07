const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const AuthorizationError = require('../scripts/components/errors/AuthorizationError');
const { SALT_ROUNDS } = require('../scripts/utils/constants');

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
    validator: URL,
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
      if (user) {
        return bcrypt.compare(password, user.password)
          .then((matched) => {
            if (matched) {
              return user;
            }
            throw new AuthorizationError();
          });
      }
      throw new AuthorizationError();
    });
};

userSchema.statics.createUserByCredentials = function createUser({
  name, about, avatar, email, password,
}) {
  // todo взять salt из окружения
  return bcrypt.hash(password, SALT_ROUNDS)
    .then((hash) => this.create({
      name,
      about,
      avatar,
      email,
      password: hash,
    }).then(({ _id }) => this.findById(_id)
      .then((user) => user)));
};

module.exports = mongoose.model('user', userSchema);
