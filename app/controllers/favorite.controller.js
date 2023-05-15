const debug = require('debug')('app:controller');
const { favorite, veterinary } = require('../models/index.datamapper');

const favoriteController = {
  async getFavorite(req, res) {
    // recuperer id utilisateur
    const { userId } = req;

    // recuperer les favoris de l'utilisateur
    const favorites = await favorite.findByAccount(userId);

    res.json({ favorites });
  },

  async createFavorite(req, res) {
    // recuperer id utilisateur
    const { userId } = req;

    const vetoId = parseInt(req.body.veterinary_id, 10);

    const addingFavorite = {
      account_id: userId,
      veterinary_id: vetoId,
    };

    // creer favoris
    const newFavorite = await favorite.create(addingFavorite);

    // Récupérer les données du vétérinaire ajouté en favoris et les renvoyer
    const newFavoriteProfile = await veterinary
      .findVeterinaryProfileById(newFavorite.veterinary_id);
    res.status(201).json({ newFavoriteProfile });
  },

  async deleteFavorite(req, res) {
    // recuperer id
    const { userId } = req;

    const veterinaryId = parseInt(req.body.veterinary_id, 10);

    // supprimer favoris
    const deleted = await favorite.delete(userId, veterinaryId);

    if (!deleted) {
      return res.status(404).json({ error: 'favorite not found' });
    }
    return res.status(204).json();
  },
};

module.exports = favoriteController;
