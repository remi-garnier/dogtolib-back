const CoreDatamapper = require('./core.datamapper');

module.exports = class Veterinary extends CoreDatamapper {
  tableName = 'veterinary';

  async findByAccountId(accountId) {
    const preparedQuery = {
      text: `SELECT 
              account.id AS id,
              account.email AS email,
              account.role AS role,
              account.firstname AS firstname,
              account.lastname AS lastname,
              account.phone_number As phone_number,
              account.address AS address,
              account.zip_code AS zip_code,
              account.city AS city,
              account.role AS role,
              ${this.tableName}.id AS veterinary_id,
              ${this.tableName}.payment_modes AS payment_modes,
              ${this.tableName}.opening_hour AS opening_hour,
              ${this.tableName}.closing_hour AS closing_hour
            FROM ${this.tableName} 
            JOIN account ON account.id = ${this.tableName}.account_id
            WHERE account.id = $1`,
      values: [accountId],
    };

    const result = await this.client.query(preparedQuery);
    if (!result.rows[0]) {
      return null;
    }
    return result.rows[0];
  }
};
