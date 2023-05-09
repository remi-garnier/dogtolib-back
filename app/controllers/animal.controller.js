const animalController = {
  getAnimals: function async(req, res) {
    res.json({ response: 'animals list' });
  },
  createAnimal: function async(req, res) {
    res.json({ response: 'create animal' });
  },

  getAnimal: function async(req, res) {
    res.json({ response: ' One animal' });
  },

  updateAnimal: function async(req, res) {
    res.json({ response: 'update animal' });
  },

  deleteAnimal: function async(req, res) {
    res.json({ response: 'delete animal' });
  },

};

module.exports = animalController;
