const express = require('express');
const veterinaryController = require('../controllers/veterinary.controller');
const controllerWrapper = require('../utils/controller-wrapper');
const validate = require('../middlewares/validation.middleware');
const veterinarySchema = require('../validation/update-veterinary.validation');

const veterinaryRouter = express.Router();

veterinaryRouter.route('/')
  /**
   * GET /veterinary
   * @summary Renvoi les informations du vétérinaire connecté
   * @returns {Veterinary} 200 - Les informations du vétérinaire connecté
   */
  .get(controllerWrapper(veterinaryController.getVeterinaryProfile))

  /**
   * PATCH /veterinary
   * Mise à jour des informations du vétérinaire connecté
   * @param {string} body.payment_modes optionnel - Modes de paiement acceptés par le vétérinaire
   * @param {time} body.opening_hours optionnel - Horaires d'ouverture du vétérinaire
   * @param {time} body.closing_hours optionnel - Horaires de fermeture du vétérinaire
   */
  .patch(validate(veterinarySchema, 'body'), controllerWrapper(veterinaryController.updateVeterinaryProfile));

veterinaryRouter.get('/search', controllerWrapper(veterinaryController.searchVeterinary));

module.exports = veterinaryRouter;
