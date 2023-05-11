const express = require('express');
const profilControler = require('../controllers/profile.controller');
const controllerWrapper = require('../utils/controller-wrapper');
const authMiddleware = require('../middlewares/auth.middleware');

const profileRouter = express.Router();

profileRouter.route('/')
/**
 * GET /profile
 * @summary Renvoi les données du compte de l’utilisateur connecté
 */
  .get(authMiddleware.isOwner, controllerWrapper(profilControler.getProfil))
/**
 * PATCH /profile
 * @summary Mise à jour des données du compte de l’utilisateur connecté
 */
  .patch(authMiddleware.isOwner, controllerWrapper(profilControler.updateProfil));

module.exports = profileRouter;
