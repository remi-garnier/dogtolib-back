const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const debug = require('debug')('app:authController');
const InvalidCredentialError = require('../errors/invalid-credentials.error');

const { account } = require('../models/index.datamapper');

const authController = {

  /**
   * @summary connecte un utilisateur
   * @return {json} json web token
   */
  async signin(req, res) {
    // récupérer les données email password
    const { email, password } = req.body;

    // chercher l'utilisateur en base
    const user = await account.findByEmail(email);

    // Si il n'existe pas renvoyer une erreur
    if (!user) {
      debug(`user ${email} not found}`);
      throw new InvalidCredentialError('Unable to login with credentials provided');
    }
    // vérifier le mot de passe
    const validPassword = await bcrypt.compare(password, user.password);

    // Si il est invalide renvoyer une erreur
    if (!validPassword) {
      debug(`user ${email} invalid password`);
      throw new InvalidCredentialError('Unable to login with credentials provided');
    }
    // générer et renvoyer un token jwt
    const token = jwt.sign({
      id: user.id,
      email: user.email,
      firstname: user.firstname,
      lastname: user.lastname,
      role: user.role,
    }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_DURATION });

    return res.json({ token });
  },

  async register(req, res) {
    res.json({ response: 'register' });
  },
};

module.exports = authController;
