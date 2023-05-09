const express = require('express');
const profileController = require('../controllers/profile.controller');

const profileRouter = express.Router();

profileRouter.route('/')
/**
 * GET /profil
 * @summary Renvoi les données du compte de l’utilisateur connecté
 */
  .get(profileController.getProfil)
/**
 * PATCH /profil
 * @summary Mise à jour des données du compte de l’utilisateur connecté
 */
  .patch(profileController.updateProfil);

module.exports = profileRouter;
