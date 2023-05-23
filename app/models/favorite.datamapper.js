const CoreDatamapper = require('./core.datamapper');

module.exports = class Favorite extends CoreDatamapper {
  tableName = 'account_has_favorite';

  async findByAccount(id) {
    const preparedQuery = {
      text: `SELECT 
              ${this.tableName}.veterinary_id,
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
            JOIN veterinary on veterinary.id = ${this.tableName}.veterinary_id
            JOIN account on account.id = veterinary.account_id
            WHERE ${this.tableName}.account_id = $1`,
      values: [id],
    };
    const result = await this.client.query(preparedQuery);

    return result.rows;
  }

  async delete(accountId, veterinaryId) {
    const preparedQuery = {
      text: `DELETE FROM ${this.tableName} 
             WHERE account_id = $1 
             AND veterinary_id = $2`,
      values: [accountId, veterinaryId],
    };
    const result = await this.client.query(preparedQuery);
    return !!result.rowCount;
  }
};
