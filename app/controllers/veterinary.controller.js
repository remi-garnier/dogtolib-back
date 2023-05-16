const bcrypt = require('bcrypt');
const { veterinary, account } = require('../models/index.datamapper');

const veterinaryController = {
  async getVeterinaryProfile(req, res) {
    const { userId } = req;

    const veterinaryProfile = await veterinary.findByAccountId(userId);
    if (!veterinaryProfile) {
      return res.status(404).json({ error: 'veterinary not found' });
    }

    return res.status(200).json({ veterinaryProfile });
  },

  async updateVeterinaryProfile(req, res) {
    const { userId } = req;

    // On répartit les données présentes dans le body
    // entre les données propres au compte et les données
    // propres au vétérinaire
    const accountData = {
      ...(req.body?.firstname && { firstname: req.body.firstname }),
      ...(req.body?.lastname && { lastname: req.body.lastname }),
      ...(req.body?.email && { email: req.body.email }),
      ...(req.body?.password && { password: req.body.password }),
      ...(req.body?.phone_number && { phone_number: req.body.phone_number }),
      ...(req.body?.address && { adress: req.body.address }),
      ...(req.body?.zip_code && { zip_code: req.body.zip_code }),
      ...(req.body?.city && { city: req.body.city }),
    };
    const veterinaryData = {
      ...(req.body?.payment_modes && { payment_modes: req.body.payment_modes }),
      ...(req.body?.opening_hour && { opening_hour: req.body.opening_hour }),
      ...(req.body?.closing_hour && { closing_hour: req.body.closing_hour }),
    };

    // Si le mot de passe est présent dans les données du compte
    // on le hashe
    if ('password' in accountData) {
      accountData.password = await bcrypt.hash(
        accountData.password,
        parseInt(process.env.BCRYPT_SALT_ROUNDS, 10),
      );
    }

    let updatedAccount;
    let updatedVeterinary;
    if (Object.keys(accountData).length !== 0) {
      updatedAccount = await account.update({ id: userId, ...accountData });
    }

    if (Object.keys(veterinaryData).length !== 0) {
      updatedVeterinary = await veterinary.updateVeterinary({ id: userId, ...veterinaryData });
    }

    return res.json({ ...updatedAccount, ...updatedVeterinary });
  },

  async searchVeterinary(req, res) {
    res.json({ reponse: 'veterinary search result' });
  },
};

module.exports = veterinaryController;
