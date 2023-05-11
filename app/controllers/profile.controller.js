const { account } = require('../models/index.datamapper');

const profilController = {

  async getProfil(req, res) {
    const profile = await account.findByPk(req.userId);
    delete profile.password;
    res.json(profile);
  },

  async updateProfil(req, res) {
    res.json({ reponse: 'profil update' });
  },
};

module.exports = profilController;
