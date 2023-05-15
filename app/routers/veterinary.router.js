const express = require('express');

const veterinaryController = require('../controllers/veterinary.controller');

const veterinaryRouter = express.Router();

veterinaryRouter.route('/')
  /**
   * GET /veterinary
   * @summary Renvoi les informations du vétérinaire connecté
   * @returns {Veterinary} 200 - Les informations du vétérinaire connecté
   */
  .get(veterinaryController.getVeterinaryProfile)

/**
   * POST /veterinary
   * @summary Création d'un profil vétérinaire
   * @param {string} body.payment_modes optionnel - Modes de paiement acceptés par le vétérinaire
   * @param {time} body.opening_hours optionnel - Horaires d'ouverture du vétérinaire
   * @param {time} body.closing_hours optionnel - Horaires de fermeture du vétérinaire
   */
// .post(veterinaryController.createVeterinaryProfile)

  /**
   * PATCH /veterinary
   * Mise à jour des informations du vétérinaire connecté
   * @param {string} body.payment_modes optionnel - Modes de paiement acceptés par le vétérinaire
   * @param {time} body.opening_hours optionnel - Horaires d'ouverture du vétérinaire
   * @param {time} body.closing_hours optionnel - Horaires de fermeture du vétérinaire
   */
  .patch(veterinaryController.updateVeterinaryProfile);

veterinaryRouter.get('/search', veterinaryController.searchVeterinary);

module.exports = veterinaryRouter;
