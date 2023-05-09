const profilController = {

  getProfil: function async(req, res) {
    res.json({ reponse: 'profil user' });
  },

  updateProfil: function async(req, res) {
    res.json({ reponse: 'profil update' });
  },
};

module.exports = profilController;
