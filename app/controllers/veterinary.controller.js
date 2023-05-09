const veterinaryController = {
  getVeterinaryProfile: function async(req, res) {
    res.json({ reponse: 'profil veterinary' });
  },

  createVeterinaryProfile: function async(req, res) {
    res.json({ reponse: 'create veterinary' });
  },

  updateVeterinaryProfile: function async(req, res) {
    res.json({ reponse: 'update veterinary' });
  },

  searchVeterinary: function async(req, res) {
    res.json({ reponse: 'veterinary search result' });
  },
};

module.exports = veterinaryController;
