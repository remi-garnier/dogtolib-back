const express = require('express');
const authController = require('../controllers/auth.controller');
const controllerWrapper = require('../utils/controller-wrapper');

const authRouter = express.Router();

/**
   * POST /auth/signin
   * @summary Connexion d'un utilisateur
   * @param {string} body.email requis - email de l'utilisateur
   * @param {string} body.password requis - mot de passe de l'utilisateur
   * @returns JWT 200 - Token d'authentification
   */
authRouter.post('/signin', controllerWrapper(authController.signin));

/**
   * POST /auth/register
   * @summary Inscription d'un utilisateur
   * @param {string} body.email requis - email de l'utilisateur
   * @param {string} body.password requis - mot de passe de l'utilisateur
   * @param {string} body.firstname requis - prénom de l'utilisateur
   * @param {string} body.lastname requis - nom de l'utilisateur
   * @param {string} body.address requis - adresse de l'utilisateur
   * @param {string} body.city requis - ville de l'utilisateur
   * @param {string} body.zipcode requis - code postal de l'utilisateur
   * @param {string} body.role requis - rôle de l'utilisateur (vétérinaire ou propriétaire)
   * @param {string} body.phone optionnel - téléphone de l'utilisateur
   */
authRouter.post('/register', controllerWrapper(authController.register));

module.exports = authRouter;
