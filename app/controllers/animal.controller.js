const { animal } = require('../models/index.datamapper');

const animalController = {
  async getAnimals(req, res) {
    const animals = await animal.findAllByOwnerId(req.userId);
    res.json({ animals });
  },
  async createAnimal(req, res) {
    const account_id = req.userId;
    const newAnimal = await animal.create({ account_id, ...req.body });
    res.status(201).json({ newAnimal });
  },

  async getAnimal(req, res) {
    res.json({ response: ' One animal' });
  },

  async updateAnimal(req, res) {
    res.json({ response: 'update animal' });
  },

  async deleteAnimal(req, res) {
    res.json({ response: 'delete animal' });
  },

};

module.exports = animalController;
