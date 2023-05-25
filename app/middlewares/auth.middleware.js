const jwt = require('jsonwebtoken');
const debug = require('debug')('app:auth.middleware');
const DogtolibError = require('../errors/dogtolib-error');

module.exports = {
  /**
   * @summary vérifie si le token est valide
   * @param {string} req.headers['x-auth-token'] requis - jwt token
   */
  checkToken(req, res, next) {
    const token = req.header('x-auth-token');

    if (!token) {
      throw new DogtolibError('No token provided, authorization denied', 401);
    }

    try {
      const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
      req.userId = decodedToken.id;
      req.userRole = decodedToken.role;
      req.userEmail = decodedToken.email;
      if (decodedToken.veterinaryId) {
        req.veterinaryId = decodedToken.veterinaryId;
      }

      return next();
    } catch (err) {
      throw new DogtolibError('Invalid token provided, authorization denied', 401);
    }
  },
};
