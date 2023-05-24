const { animal } = require('../models/index.datamapper');
const DogtolibError = require('../errors/dogtolib-error');

const animalController = {
  async getAnimals(req, res) {
    const animals = await animal.findAllByOwnerId(req.userId);
    return res.json({ animals });
  },

  /**
   * @summary Créer un animal pour l'utilisateur connecté
   * @returns 201 l'animal créé
   */
  async createAnimal(req, res) {
    const newAnimal = await animal.create({ account_id: req.userId, ...req.body });
    return res.status(201).json({ newAnimal });
  },

  /**
   *
   * @summary Renvoi les infos d'un animal donné
   * @returns {Animal} 200 - Animal
   */
  async getAnimal(req, res) {
    const { animalId } = req.params;
    const animalData = await animal.findOneById(animalId);
    // Si l'animal n'existe pas
    if (!animalData) {
      return res.status(404).json({ animal: null });
    }
    // Si l'utilisateur n'est ni le proriétaire de l'animal ni vétérinaire
    if (animalData.account_id !== req.userId && req.userRole !== 'V') {
      throw new DogtolibError('Forbidden', 403);
    }

    return res.json({ animal: animalData });
  },

  /**
   * @summary Met à jour un animal donné
   * @returns {Animal} 200 - Animal mis à jour
   */
  async updateAnimal(req, res) {
    const { animalId } = req.params;
    const toUpdate = await animal.findByPk(animalId);

    // vérifier que l'animal existe
    if (!toUpdate) {
      return res.status(404).json({ animal: null });
    }

    // vérifier que l'utilisateur est propriétaire de l'animal
    if (toUpdate.account_id !== req.userId) {
      throw new DogtolibError('Forbidden', 403);
    }
    // Mettre à jour l'animal
    const updatedAnimal = await animal.update({ id: animalId, ...req.body });

    // Renvoyer 200 avec les nouvelles données
    return res.json({ animal: updatedAnimal });
  },

  /**
   * @summary Supprime un animal donné
   */
  async deleteAnimal(req, res) {
    const { animalId } = req.params;
    const toDelete = await animal.findByPk(animalId);

    // vérifier que l'animal existe
    if (!toDelete) {
      return res.status(404).json({ animal: null });
    }

    // vérifier que l'utilisateur est propriétaire de l'animal
    if (toDelete.account_id !== req.userId) {
      throw new DogtolibError('Forbidden', 403);
    }

    // Supprimer l'animal
    await animal.delete(animalId);

    return res.status(204).end();
  },

};

module.exports = animalController;
