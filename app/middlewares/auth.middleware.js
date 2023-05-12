const jwt = require('jsonwebtoken');
const debug = require('debug')('app:auth.middleware');
const InvalidTokenError = require('../errors/invalid-token.error');
const InvalidRoleError = require('../errors/invalid-role.error');

module.exports = {
  /**
   * @summary vérifie si le token est valide
   * @param {string} req.headers['x-auth-token'] requis - jwt token
   */
  checkToken(req, res, next) {
    console.log('on passe token');
    const token = req.header('x-auth-token');
    console.log(token);

    if (!token) {
      throw new InvalidTokenError('No token provided, authorization denied');
    }

    try {
      const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
      req.userId = decodedToken.id;
      req.userRole = decodedToken.role;
      return next();
    } catch (err) {
      throw new InvalidTokenError('Invalid token provided, authorization denied');
    }
  },

  /**
   * @summary vérifie si le role de l'utilsateur est "Veterinary" (V)
   */
  isVeterinary(req, res, next) {
    if (req.userRole !== 'V') {
      throw new InvalidTokenError('User is not a veterinary');
    }
    return next();
  },

  /**
   * @summary vérifie si le role de l'utilsateur est "Owner" (O)
   */
  isOwner(req, res, next) {
    if (req.userRole !== 'O') {
      throw new InvalidTokenError('User is not an owner');
    }
    return next();
  },
};
