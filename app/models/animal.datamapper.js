const CoreDatamapper = require('./core.datamapper');
const debug = require('debug')('app:animalDatamapper');

module.exports = class Animal extends CoreDatamapper {
  tableName = 'animal';

  /**
   * @summary Renvoi tous les animaux d'un utilisateur connecté
   * @param {number} accoutId id de l'utilisateur connecté
   * @returns [animal]
   */
  async findAllByOwnerId(accountId) {
    const preparedQuery = {
      text: `SELECT * FROM "${this.tableName}" WHERE account_id = $1`,
      values: [accountId],
    };

    const result = await this.client.query(preparedQuery);
    if (result.rowCount === 0) {
      return null;
    }
    return result.rows;
  }
};
