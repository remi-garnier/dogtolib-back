const express = require('express');
const animalController = require('../controllers/animal.controller');

const animalRouter = express.Router();

animalRouter.route('/')
/**
 * GET /animal
 * @summary retourne tous les animaux de l'utilisateur connecté
 * @ return {[Animal]]}
 * */
  .get(animalController.getAnimals)
  /**
   * POST /animal
   * @summary Créer un animal pour l'utilisateur connecté
   * @param {string} body.animal.name requis - nom de l'animal
   * @param {string} body.animal.birthdate requis - date de naissance de l'animal
   * @param {string} body.animal.species requis - espèce de l'animal
   * @param {string} body.animal.breed optionnel - race de l'animal
   * @return {Animal} 201 - Animal créé
   */
  .post(animalController.createAnimal);

animalRouter.route('/:animalId(\\d+)')
  /**
   * GET /animal/{animalId}
   * @summary Retourne un animal donné
   * @param {number} animalId - id de l'animal à retourner
   * @return {Animal} 200 - Animal
   */
  .get(animalController.getAnimal)
  /**
   * PATCH /animal/{animalId}
   * @summary Met à jour un animal donné
   * @param {number} animalId - id de l'animal à mettre à jour
   * @return {Animal} 200 - Animal mis à jour
   */
  .patch(animalController.updateAnimal)
  /**
   * DELETE /animal/{animalId}
   * @summary Supprime un animal donné
   * @param {number} animalId - id de l'animal à supprimer
   * @return 204
   */
  .delete(animalController.deleteAnimal);
module.exports = animalRouter;
