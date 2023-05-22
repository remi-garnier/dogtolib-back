const { veterinary } = require('../models/index.datamapper');

const veterinaryController = {

  async searchVeterinary(req, res) {
    const name = req.query?.name || '';
    let city = req.query?.city || '';

    city = city.replaceAll('-', ' ');
    const searchResult = await veterinary.searchVeterinary(name, city);
    res.json({ searchResult });
  },
};

module.exports = veterinaryController;
