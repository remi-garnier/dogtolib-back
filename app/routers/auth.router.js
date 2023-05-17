const express = require('express');
const authController = require('../controllers/auth.controller');
const controllerWrapper = require('../utils/controller-wrapper');
const validate = require('../middlewares/validation.middleware');
const signinSchema = require('../validation/signin.validation');
const registerSchema = require('../validation/register.validation');

const authRouter = express.Router();

/**
   * POST /auth/signin
   * @typedef {String} JWT
   * @tags Authentification
   * @summary Connexion d'un utilisateur
   * @param {string} body.email.required email de l'utilisateur
   * @param {string} body.password.required mot de passe de l'utilisateur
   * @return {JWT} 200 - Token d'authentification
   * @return {string} 401 - Identifiants invalides
   */
authRouter.post('/signin', validate(signinSchema, 'body'), controllerWrapper(authController.signin));

/**
   * POST /auth/register
   * @typedef {Object} account
   * @tags Authentification
   * @summary Inscription d'un utilisateur
   * @param {string} body.email requis - email de l'utilisateur
   * @param {string} body.password requis - mot de passe de l'utilisateur
   * @param {string} body.repeatpassword requis - confirmation mot de passe de l'utilisateur
   * @param {string} body.firstname requis - prénom de l'utilisateur
   * @param {string} body.lastname requis - nom de l'utilisateur
   * @param {string} body.address requis - adresse de l'utilisateur
   * @param {string} body.city requis - ville de l'utilisateur
   * @param {string} body.zipcode requis - code postal de l'utilisateur
   * @param {string} body.role requis - rôle de l'utilisateur (vétérinaire ou propriétaire)
   * @param {string} body.phone optionnel - téléphone de l'utilisateur
   * @return {account} 200 - Compte utilisateur créé
   * @return {object} 400 - Erreur de validation
   * @return {object} 400 - Un utilisateur avec cet email existe déjà
   */
authRouter.post('/register', validate(registerSchema, 'body'), controllerWrapper(authController.register));

module.exports = authRouter;
