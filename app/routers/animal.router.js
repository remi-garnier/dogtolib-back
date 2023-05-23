const express = require('express');
const animalController = require('../controllers/animal.controller');
const controllerWrapper = require('../utils/controller-wrapper');
const validate = require('../middlewares/validation.middleware');
const createAnimalSchema = require('../validation/create-animal.validation');
const updateAnimalSchema = require('../validation/update-animal.validation');

const animalRouter = express.Router();

animalRouter.route('/')
/**
 * GET /animal
 * @tags Animal
 * @summary retourne tous les animaux de l'utilisateur connecté
 * @ return {[Animal]]} animals - Un tableau d'animaux
 * */
  .get(controllerWrapper(animalController.getAnimals))
  /**
   * POST /animal
   * @tags Animal
   * @summary Créer un animal pour l'utilisateur connecté
   * @param {string} body.name.required - nom de l'animal
   * @param {string} body.birthdate.required - date de naissance de l'animal
   * @param {string} body.species.required - espèce de l'animal
   * @param {string} body.breed optionnel - race de l'animal
   * @param {string} body.memo optionnel - mémo sur l'animal
   * @return {Animal} 201 - Animal créé
   * @return {string} 400 - Erreur de validation des données en entrée
   */
  .post(validate(createAnimalSchema, 'body'), controllerWrapper(animalController.createAnimal));

animalRouter.route('/:animalId(\\d+)')
  /**
   * GET /animal/{animalId}
   * @typedef {Object} Animal
   * @tags Animal
   * @summary Retourne un animal donné
   * @param {number} query.animalId.required - id de l'animal à retourner
   * @return {Animal} 200 - Animal
   * @return {string} 404 - Animal non trouvé
   * @return {string} 403 - L'utilisateur n'est pas autorisé à voir cet animal
   */
  .get(controllerWrapper(animalController.getAnimal))
  /**
   * PATCH /animal/{animalId}
   * @tags Animal
   * @summary Met à jour un animal donné
   * @param {number} query.animalId.required - id de l'animal à mettre à jour
   * @return {Animal} 200 - Animal mis à jour
   * @return {string} 404 - Animal non trouvé
   * @return {string} 403 - L'utilisateur n'est pas autorisé à mettre à jour cet animal
   */
  .patch(validate(updateAnimalSchema, 'body'), controllerWrapper(animalController.updateAnimal))
  /**
   * DELETE /animal/{animalId}
   * @tags Animal
   * @summary Supprime un animal donné
   * @param {number} query.animalId.required - id de l'animal à supprimer
   * @return 204 - L'animal a bien été supprimé
   * @return {string} 404 - Animal non trouvé
   * @return {string} 403 - L'utilisateur n'est pas autorisé à supprimer cet animal
   */
  .delete(controllerWrapper(animalController.deleteAnimal));
module.exports = animalRouter;
