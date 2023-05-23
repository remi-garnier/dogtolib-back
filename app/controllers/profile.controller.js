const { account, veterinary } = require('../models/index.datamapper');
const buildParamObject = require('../utils/build-param-object');
const { hashPassword } = require('../utils/password');

const debug = require('debug')('app:profileController');

const profileController = {

  /**
   * @summary Récupère les infos de profil de l'utilisateur connecté
   */
  async getProfile(req, res) {
    const { userId } = req;
    let profile;
    if (req.userRole === 'O') {
      profile = await account.findByPk(userId);
      delete profile.password;
    }
    if (req.userRole === 'V') {
      profile = await veterinary.findByAccountId(userId);
    }

    if (!profile) {
      return res.status(404).json({ profile: null });
    }
    return res.json(profile);
  },

  /**
   * @summary Met à jour les infos de profil de l'utilisateur connecté
   */
  async updateProfile(req, res) {
    const { userId } = req;
    const inputData = req.body;
    let updatedProfile;
    let updatedVeterinary;

    const accountFields = [
      'firstname',
      'lastname',
      'email',
      'password',
      'phone_number',
      'address',
      'zip_code',
      'city',
    ];
    // Données du compte à mettre à jour
    const accountData = buildParamObject(accountFields, inputData);

    // si le mot de passe est présent dans le body
    // on le hash et on supprime le repeat_password
    if ('password' in accountData) {
      accountData.password = await hashPassword(accountData.password);
      delete accountData.repeat_password;
    }

    // Si il y a des données à mettre à jour dans la table account
    if (Object.keys(accountData).length !== 0) {
      updatedProfile = await account.update({ id: userId, ...accountData });
      delete updatedProfile.password;
    }

    if (req.userRole === 'V') {
      const veterinaryFields = [
        'payment_modes',
        'opening_hour',
        'closing_hour',
      ];
      // Données du vétérinaire à mettre à jour
      const veterinaryData = buildParamObject(veterinaryFields, inputData);

      // Si il y a des données à mettre à jour dans la table veterinary
      if (Object.keys(veterinaryData).length !== 0) {
        updatedVeterinary = await veterinary.updateVeterinary({ id: userId, ...veterinaryData });
      }
    }

    // On retourne les données mises à jour
    return res.json({ ...updatedProfile, ...updatedVeterinary });
  },
};

module.exports = profileController;
