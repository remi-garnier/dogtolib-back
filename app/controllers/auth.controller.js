const jwt = require('jsonwebtoken');
const debug = require('debug')('app:authController');
const { checkPassword, hashPassword } = require('../utils/password');
const DogtolibError = require('../errors/dogtolib-error');
// const InvalidCredentialError = require('../errors/invalid-credentials.error');
// const UsedMailError = require('../errors/used-mail.error');

const { account, veterinary } = require('../models/index.datamapper');

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
      throw new DogtolibError('Unable to login with credentials provided', 401);
    }
    // vérifier le mot de passe
    const validPassword = await checkPassword(password, user.password);
    // Si il est invalide renvoyer une erreur
    if (!validPassword) {
      debug(`user ${email} invalid password`);
      throw new DogtolibError('Unable to login with credentials provided', 401);
    }
    // générer et renvoyer un token jwt
    const token = jwt.sign({
      id: user.id,
      email: user.email,
      firstname: user.firstname,
      lastname: user.lastname,
      role: user.role,
      ...(user.role === 'V' && { veterinaryId: user.veterinary_id }),
    }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_DURATION });

    return res.json({ token });
  },

  async register(req, res) {
    const accountData = req.body;
    delete accountData.repeat_password;

    // vérifier si l'utilisateur existe déjà
    const existingUser = await account.findByEmail(accountData.email);
    if (existingUser) {
      throw new DogtolibError('User with this email already exists', 400);
    }

    // hasher le mot de passe
    accountData.password = await hashPassword(accountData.password);

    // créer le compte en base
    const newAccount = await account.create(accountData);
    delete newAccount.password;

    // Si vétérinaire créer l'entrée dans veterinary
    if (accountData.role === 'V') {
      await veterinary.create({ account_id: newAccount.id });
    }

    res.json({ newAccount });
  },
};

module.exports = authController;
