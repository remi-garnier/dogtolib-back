const CoreDatamapper = require('./core.datamapper');

module.exports = class Animal extends CoreDatamapper {
  tableName = 'animal';
};
