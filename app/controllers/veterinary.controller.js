const bcrypt = require('bcrypt');
const { veterinary, account } = require('../models/index.datamapper');

const veterinaryController = {

  async searchVeterinary(req, res) {
    res.json({ reponse: 'veterinary search result' });
  },
};

module.exports = veterinaryController;
