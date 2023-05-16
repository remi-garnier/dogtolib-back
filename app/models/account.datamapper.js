const CoreDatamapper = require('./core.datamapper');

module.exports = class Account extends CoreDatamapper {
  tableName = 'account';

  async findByEmail(email) {
    const preparedQuery = {
      text: `SELECT
        account.id as id,
        account.email as email,
        account.firstname as firstname,
        account.lastname as lastname,
        account.role as role,
        account.password as password,
        veterinary.id as veterinary_id
      FROM ${this.tableName} 
      LEFT JOIN veterinary ON veterinary.account_id = account.id
      WHERE email = $1`,
      values: [email],
    };
    const result = await this.client.query(preparedQuery);
    if (!result.rows[0]) {
      return null;
    }
    return result.rows[0];
  }
};
