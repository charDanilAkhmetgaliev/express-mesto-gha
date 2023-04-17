module.exports.tempAuth = (req, res, next) => {
  req.user = {
    _id: '64381393100c956e41b7ffb',
  };

  next();
};
