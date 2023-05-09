const favoriteController = {
  getFavorite: function async(req, res) {
    res.json({ reponse: 'list of favorite veterinary' });
  },

  createFavorite: function async(req, res) {
    res.json({ reponse: 'create favorite veterinary' });
  },

  deleteFAvorite: function async(req, res) {
    res.json({ reponse: 'delete favorite veterinary' });
  },
};

module.exports = favoriteController;
