const CoreDatamapper = require('./core.datamapper');

module.exports = class Favorite extends CoreDatamapper {
  tableName = 'account_has_favorite';
};
