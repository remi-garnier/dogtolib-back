const veterinaryController = {
  async getVeterinaryProfile(req, res) {
    res.json({ reponse: 'profil veterinary' });
  },

  async createVeterinaryProfile(req, res) {
    res.json({ reponse: 'create veterinary' });
  },

  async updateVeterinaryProfile(req, res) {
    res.json({ reponse: 'update veterinary' });
  },

  async searchVeterinary(req, res) {
    res.json({ reponse: 'veterinary search result' });
  },
};

module.exports = veterinaryController;
