const express = require('express');
const profilControler = require('../controllers/profile.controller');
const controllerWrapper = require('../utils/controller-wrapper');
const authMiddleware = require('../middlewares/auth.middleware');
const validate = require('../middlewares/validation.middleware');
const updateProfileSchema = require('../validation/update-profile.validation');

const profileRouter = express.Router();

profileRouter.route('/')
/**
 * GET /profile
 * @typedef account
 * @summary Renvoi les données du compte de l’utilisateur connecté
 * @returns {account} 200 - Les données du compte de l’utilisateur connecté
 */
  .get(authMiddleware.isOwner, controllerWrapper(profilControler.getProfile))
  /**
  * PATCH /profile
  * @summary Mise à jour des données du compte de l’utilisateur connecté
  * @param {string} body.email optionnel - email de l'utilisateur
  * @param {string} body.password optionnel - mot de passe de l'utilisateur
  * @param {string} body.repeatpassword optionnel - confirmation mot de passe de l'utilisateur
  * @param {string} body.firstname optionnel - prénom de l'utilisateur
  * @param {string} body.lastname optionnel - nom de l'utilisateur
  * @param {string} body.address optionnel - adresse de l'utilisateur
  * @param {string} body.city optionnel - ville de l'utilisateur
  * @param {string} body.zipcode optionnel - code postal de l'utilisateur
  * @param {string} body.role optionnel - rôle de l'utilisateur (vétérinaire ou propriétaire)
  * @param {string} body.phone optionnel - téléphone de l'utilisateur
  * @return {account} 200 - Les données du compte de l’utilisateur après modification
  */
  .patch(authMiddleware.isOwner, validate(updateProfileSchema, 'body'), controllerWrapper(profilControler.updateProfile));

module.exports = profileRouter;
