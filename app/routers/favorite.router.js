const express = require('express');
const favoriteController = require('../controllers/favorite.controller');
const controllerWrapper = require('../utils/controller-wrapper');
const validate = require('../middlewares/validation.middleware');
const favoriteSchema = require('../validation/favorite.validation');

const favoriteRouter = express.Router();

favoriteRouter.route('/')
  /**
   * GET /favorite
   * @tags Favorite
   * @summary Renvoi les vétérinaires favoris de l'utilisateur connecté
   * @return {[Account]} 200 - favorites tableau: profil des vétérinaires favoris
   */
  .get(controllerWrapper(favoriteController.getFavorite))
  /**
   * POST /favorite
   * @tags Favorite
   * @summary Créer un vétérinaire favoris pour l'utilisateur connecté
   * @param {string} body.veterinary_id.required - id du vétérinaire à ajouter en favoris
   * @return {account} 201 - favorite: profil du vétérinaire ajouté en favoris
   * @return {string} 404 - Le vétérinaire n'existe pas
   * @return {string} 400 - Erreur de validation des données en entrée
   */
  .post(validate(favoriteSchema, 'body'), controllerWrapper(favoriteController.createFavorite))

  /**
  * DELETE /favorite
  * @tags Favorite
  * @summary Supprime un vétérinaire favoris pour l'utilisateur connecté
  * @param {string} body.veterinary_id requis - id du vétérinaire à retirer des favoris
  * @return 204 - Le vétérinaire a bien été supprimé des favoris
  * @return {string} 404 - Le vétérinaire n'est pas dans les favoris
  * @return {string} 400 - Erreur de validation des données en entrée
  */
  .delete(validate(favoriteSchema, 'body'), controllerWrapper(favoriteController.deleteFavorite));

module.exports = favoriteRouter;
