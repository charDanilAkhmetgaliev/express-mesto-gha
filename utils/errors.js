const DEF_CODE = 500;
const DATA_CODE = 400;
const OBJECT_CODE = 404;

const DEF_MESSAGE = 'Произошла ошибка сервера';
const DATA_MESSAGE = 'Переданы некорректные данные';
const OBJECT_MESSAGE = 'Запрашиваемый объект не найден';

const handlerErrors = (err, res) => {
  const errorName = err.name;

  switch (errorName) {
    case 'CastError':
      res.status(OBJECT_CODE).send({ message: OBJECT_MESSAGE });
      break;
    case 'ValidationError':
      res.status(DATA_CODE).send({ message: DATA_MESSAGE });
      break;
    default:
      res.status(DEF_CODE).send({ message: DEF_MESSAGE });
  }
};

module.exports = {
  handlerErrors,
};
