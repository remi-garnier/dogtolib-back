const pool = require('./pg.pool');

const Account = require('./account.datamapper');
const Veterinary = require('./veterinary.datamapper');
const Animal = require('./animal.datamapper');

module.exports = {
  account: new Account(pool),
  veterinary: new Veterinary(pool),
  animal: new Animal(pool),
};
