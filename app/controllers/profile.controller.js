const { account, veterinary } = require('../models/index.datamapper');

const profilController = {

  async getProfil(req, res) {
    let profile;
    if (req.userRole === 'O') {
      profile = await account.findByPk(req.userId);
      delete profile.password;
    } else if (req.userRole === 'V') {
      profile = await veterinary.findByAccountId(req.userId);
    }

    res.json(profile);
  },

  async updateProfil(req, res) {
    res.json({ reponse: 'profil update' });
  },
};

module.exports = profilController;
