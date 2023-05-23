const debug = require('debug')('app:controller');
const { favorite, veterinary } = require('../models/index.datamapper');

const favoriteController = {
  async getFavorite(req, res) {
    // recuperer id utilisateur
    const { userId } = req;

    // recuperer les favoris de l'utilisateur
    const favorites = await favorite.findByAccount(userId);

    return res.json({ favorites });
  },

  async createFavorite(req, res) {
    // recuperer id utilisateur
    const { userId } = req;

    const vetoId = parseInt(req.body.veterinary_id, 10);

    const addingFavorite = {
      account_id: userId,
      veterinary_id: vetoId,
    };

    // Récupérer les données du vétérinaire à ajouter en favoris
    const newFavoriteProfile = await veterinary
      .findVeterinaryProfileById(vetoId);

    // Si le vétérinaire n'existe pas, on renvoie une erreur
    if (!newFavoriteProfile) {
      return res.status(404).json({ favorite: null });
    }

    // creer favoris et renvoyer les infos du vétérinaire correspondant
    await favorite.create(addingFavorite);
    return res.status(201).json({ favorite: newFavoriteProfile });
  },

  async deleteFavorite(req, res) {
    // recuperer id
    const { userId } = req;

    const veterinaryId = parseInt(req.body.veterinary_id, 10);

    // supprimer favoris
    const deleted = await favorite.delete(userId, veterinaryId);

    if (!deleted) {
      return res.status(404).json({ favorite: null });
    }
    return res.status(204).json();
  },
};

module.exports = favoriteController;
