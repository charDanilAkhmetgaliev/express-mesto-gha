// temp data
const SALT_ROUNDS = 10;
const JWT_SECRET = '8b25b382b1a5b75ace37f19d5d26aabe35e68e5898851f9b9078ee9ce29ce9bf';
// regExp patterns
const REG_EXP_EMAIL = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
const REG_EXP_PASSWORD = /^[a-zA-Z0-9!@#$%^&*()_+<>?/.,{};':"\\|-]{8,20}$/;
const REG_EXP_LINK = /^https?:\/\/(www.)?[\w-]+\.[a-z]{2,}[\w\-.~:/?#@!$&'()*+,;=]*#?$/;
const REG_EXP_JWT = /^jwt=[\w\-.~+/\\]+$/;

module.exports = {
  REG_EXP_LINK,
  REG_EXP_JWT,
  REG_EXP_EMAIL,
  REG_EXP_PASSWORD,
  JWT_SECRET,
  SALT_ROUNDS,
};
