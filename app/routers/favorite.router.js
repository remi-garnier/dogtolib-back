const express = require('express');
const favoriteController = require('../controllers/favorite.controller');
const controllerWrapper = require('../utils/controller-wrapper');

const favoriteRouter = express.Router();

favoriteRouter.route('/')
  /**
   * GET /favorite
   * @summary Renvoi les vétérinaires favoris de l'utilisateur connecté
   * @return {[Account]}
   */
  .get(controllerWrapper(favoriteController.getFavorite))
  /**
   * POST /favorite
   * @summary Créer un vétérinaire favoris pour l'utilisateur connecté
   * @param {string} body.veterinaryId requis - id du vétérinaire
   * @return 201 - Vétérinaire créé
   */
  .post(controllerWrapper(favoriteController.createFavorite));

/**
 * DELETE /favorite/{veterinaryId}
 * @summary Supprime un vétérinaire favoris pour l'utilisateur connecté
 * @param {string} params.veterinaryId requis - id du vétérinaire
 */
favoriteRouter.delete('/:veterinaryId(\\d+)', controllerWrapper(favoriteController.deleteFavorite));

module.exports = favoriteRouter;
