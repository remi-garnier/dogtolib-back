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
      text: `SELECT 
               id,
               name,
               specie,
               breed,
               account_id,
               TO_CHAR(birthdate, 'DD/MM/YYYY') AS birthdate,
               EXTRACT(YEAR FROM AGE(birthdate)) AS age,
               memo
             FROM "${this.tableName}" WHERE account_id = $1`,
      values: [accountId],
    };

    const result = await this.client.query(preparedQuery);
    return result.rows;
  }

  async findOneById(id) {
    const preparedQuery = {
      text: `SELECT 
               id,
               name,
               specie,
               breed,
               account_id,
               TO_CHAR(birthdate, 'DD/MM/YYYY') AS birthdate,
               EXTRACT(YEAR FROM AGE(birthdate)) AS age,
               memo
             FROM "${this.tableName}" WHERE id = $1`,
      values: [id],
    };

    const result = await this.client.query(preparedQuery);

    if (!result.rows[0]) {
      return null;
    }

    return result.rows[0];
  }
};
