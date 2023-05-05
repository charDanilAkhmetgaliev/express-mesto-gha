// temp data
const SALT_ROUNDS = 10;
const JWT_SECRET = '8b25b382b1a5b75ace37f19d5d26aabe35e68e5898851f9b9078ee9ce29ce9bf';
// regExp patterns
const regExpEmail = /^[a-zA-Z0-9\._%\+-]+@[a-zA-Z0-9\.-]+\.[a-zA-Z]{2,}$/;
const regExpPassword = /^[a-zA-Z0-9!@#\$%\^&\*\(\)_\+<>\?\/\.,{};\':\"\[\]\\|-]{8,20}$/;
const regExpLink = /^https?:\/\/(www.)?[\w\-]+\.[a-z]{2,}[\w\-\.~:\/\?\#\[\]@!\$&'\(\)\*\+,;=]*#?$/;
const regExpJwt = /^jwt=[\w\-\.~\+\/\\]+$/;

module.exports = {
  regExpLink,
  regExpJwt,
  regExpEmail,
  regExpPassword,
  JWT_SECRET,
  SALT_ROUNDS,
};
