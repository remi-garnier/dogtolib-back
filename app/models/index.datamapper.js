const pool = require('./pg.pool');

const Account = require('./account.datamapper');
const Veterinary = require('./veterinary.datamapper');
const Favorite = require('./favorite.datamapper');

module.exports = {
  account: new Account(pool),
  veterinary: new Veterinary(pool),
  favorite: new Favorite(pool),
};
