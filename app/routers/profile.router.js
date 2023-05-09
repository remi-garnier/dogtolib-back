const express = require('express');
const profilControler = require('../controllers/profile.controller');

const profileRouter = express.Router();

profileRouter.route('/')
/**
 * GET /profil
 * @summary Renvoi les données du compte de l’utilisateur connecté
 */
  .get(profilControler.getProfil)
/**
 * PATCH /profil
 * @summary Mise à jour des données du compte de l’utilisateur connecté
 */
  .patch(profilControler.updateProfil);

module.exports = profileRouter;
