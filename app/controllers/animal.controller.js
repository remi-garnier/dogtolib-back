const animalController = {
  async getAnimals(req, res) {
    res.json({ response: 'animals list' });
  },
  async createAnimal(req, res) {
    res.json({ response: 'create animal' });
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
