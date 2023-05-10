const pool = require('./pg.pool');

const Account = require('./account.datamapper');
const Veterinary = require('./veterinary.datamapper');

module.exports = {
  account: new Account(pool),
  veterinary: new Veterinary(pool),
};
