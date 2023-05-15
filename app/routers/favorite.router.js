const express = require('express');
const favoriteController = require('../controllers/favorite.controller');
const controllerWrapper = require('../utils/controller-wrapper');
const validate = require('../middlewares/validation.middleware');
const favoriteSchema = require('../validation/favorite.validation');

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
  .post(validate(favoriteSchema, 'body'), controllerWrapper(favoriteController.createFavorite))

  /**
  * DELETE /favorite/{veterinaryId}
  * @summary Supprime un vétérinaire favoris pour l'utilisateur connecté
  * @param {string} body.veterinaryId requis - id du vétérinaire
  */
  .delete(validate(favoriteSchema, 'body'), controllerWrapper(favoriteController.deleteFavorite));

module.exports = favoriteRouter;
