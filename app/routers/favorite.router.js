const express = require('express');
const favoriteController = require('../controllers/favorite.controller');

const favoriteRouter = express.Router();

favoriteRouter.route('/')
  /**
   * GET /favorite
   * @summary Renvoi les vétérinaires favoris de l'utilisateur connecté
   * @return {[Account]}
   */
  .get(favoriteController.getFavorite)
  /**
   * POST /favorite
   * @summary Créer un vétérinaire favoris pour l'utilisateur connecté
   * @param {string} body.veterinaryId requis - id du vétérinaire
   * @return 201 - Vétérinaire créé
   */
  .post(favoriteController.createFavorite);

/**
 * DELETE /favorite/{veterinaryId}
 * @summary Supprime un vétérinaire favoris pour l'utilisateur connecté
 * @param {string} params.veterinaryId requis - id du vétérinaire
 */
favoriteRouter.delete('/:veterinaryId(\\d+)', favoriteController.deleteFavorite);

module.exports = favoriteRouter;
