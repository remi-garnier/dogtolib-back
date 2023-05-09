const favoriteController = {
  async getFavorite(req, res) {
    res.json({ reponse: 'list of favorite veterinary' });
  },

  async createFavorite(req, res) {
    res.json({ reponse: 'create favorite veterinary' });
  },

  async deleteFavorite(req, res) {
    res.json({ reponse: 'delete favorite veterinary' });
  },
};

module.exports = favoriteController;
