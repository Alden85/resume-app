const jwt = require('jsonwebtoken'); //load in so we can validate token provided by client
const User = require('../models/user'); //load in so we can find user in db
/*----------------------------- Our defined middleware funcs---------- */
//middleware has access to same info as the route handlers(next is specific to register middleware)

const auth = async (req, res, next) => {
  try {
    const token = req.header('Authorization').replace('Bearer ', '');
    const decoded = jwt.verify(token, process.env.AUTH_SECRET);
    const user = await User.findOne({
      _id: decoded._id,
      'tokens.token': token,
    });

    if (!user) {
      throw new Error();
    }
    req.token = token;
    req.user = user;
    next();
  } catch (e) {
    res.status(401).send({ error: 'Please authenticate.' });
  }
};

module.exports = auth;
