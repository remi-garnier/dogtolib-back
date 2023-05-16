const { account } = require('../models/index.datamapper');
const bcrypt = require('bcrypt');
const debug = require('debug')('app:profileController');

const profileController = {

  /**
   * @summary Récupère les infos de profil de l'utilisateur connecté
   */
  async getProfile(req, res) {
    const profile = await account.findByPk(req.userId);
    delete profile.password;
    res.json(profile);
  },

  /**
   * @summary Met à jour les infos de profil de l'utilisateur connecté
   */
  async updateProfile(req, res) {
    const id = req.userId;
    const inputData = req.body;

    // si le mot de passe est présent dans le body
    // on le hash et on supprime le repeat_password
    if ('password' in inputData) {
      inputData.password = await bcrypt.hash(
        inputData.password,
        parseInt(process.env.BCRYPT_SALT_ROUNDS, 10),
      );
      delete inputData.repeat_password;
    }
    const updatedProfile = await account.update({ id, ...inputData });
    delete updatedProfile.password;

    // On retourne le profil sans le mot de passe
    res.status(200).json(updatedProfile);
  },
};

module.exports = profileController;
