module.exports = (req, res, next) => {
  req.user = {
    _id: '64381393100c956e41b7ffb4',
  };

  next();
};
