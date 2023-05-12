const CoreDatamapper = require('./core.datamapper');

module.exports = class Veterinary extends CoreDatamapper {
  tableName = 'veterinary';

  async findVeterinaryProfileById(id) {
    const preparedQuery = {
      text: `SELECT 
            ${this.tableName}.id as veterinary_id,
            account.firstname as firstname,
            account.lastname as lastname,
            account.email as email,
            account.phone_number as phone,
            account.address as address,
            account.city as city,
            account.zip_code as zipcode,
            veterinary.opening_hour as opening_hour,
            veterinary.closing_hour as closing_hour,
            veterinary.payment_modes as payment_modes
            FROM ${this.tableName} 
            JOIN account ON account.id = ${this.tableName}.account_id
            WHERE ${this.tableName}.id = $1`,
      values: [id],
    };
    const result = await this.client.query(preparedQuery);

    if (result.rowCount === 0) {
      return null;
    }

    return result.rows[0];
  }
};
