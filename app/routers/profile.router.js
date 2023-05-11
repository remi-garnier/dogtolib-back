const express = require('express');
const profilControler = require('../controllers/profile.controller');
const controllerWrapper = require('../utils/controller-wrapper');

const profileRouter = express.Router();

profileRouter.route('/')
/**
 * GET /profile
 * @summary Renvoi les données du compte de l’utilisateur connecté
 */
  .get(controllerWrapper(profilControler.getProfil))
/**
 * PATCH /profile
 * @summary Mise à jour des données du compte de l’utilisateur connecté
 */
  .patch(controllerWrapper(profilControler.updateProfil));

module.exports = profileRouter;
