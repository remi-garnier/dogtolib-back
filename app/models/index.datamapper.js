const pool = require('./pg.pool');

const Account = require('./account.datamapper');
const Veterinary = require('./veterinary.datamapper');
const Favorite = require('./favorite.datamapper');
const Animal = require('./animal.datamapper');
const Reminder = require('./reminders.datamapper');

module.exports = {
  account: new Account(pool),
  veterinary: new Veterinary(pool),
  favorite: new Favorite(pool),
  animal: new Animal(pool),
  reminder: new Reminder(pool),
};
