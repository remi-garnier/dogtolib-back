const { animal } = require('../models/index.datamapper');

const animalController = {
  async getAnimals(req, res) {
    const animals = await animal.findAllByOwnerId(req.userId);
    return res.json({ animals });
  },
  async createAnimal(req, res) {
    const account_id = req.userId;
    const newAnimal = await animal.create({ account_id, ...req.body });
    return res.status(201).json({ newAnimal });
  },

  async getAnimal(req, res) {
    const { animalId } = req.params;
    const animalData = await animal.findByPk(animalId);
    // Si l'animal n'existe pas
    if (!animal) {
      return res.status(404).json({ error: 'Not found' });
    }
    // Si l'utilisateur n'est ni le proriétaire de l'animal ni vétérinaire
    if (animalData.account_id !== req.userId && req.userRole !== 'V') {
      return res.status(403).json({ error: 'Forbidden' });
    }

    return res.json({ animalData });
  },

  async updateAnimal(req, res) {
    res.json({ response: 'update animal' });
  },

  async deleteAnimal(req, res) {
    res.json({ response: 'delete animal' });
  },

};

module.exports = animalController;
