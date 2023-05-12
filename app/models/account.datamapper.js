const CoreDatamapper = require('./core.datamapper');

module.exports = class Account extends CoreDatamapper {
  tableName = 'account';

  async findByEmail(email) {
    const preparedQuery = {
      text: `SELECT * FROM ${this.tableName} WHERE email = $1`,
      values: [email],
    };
    const result = await this.client.query(preparedQuery);
    if (!result.rows[0]) {
      return null;
    }
    return result.rows[0];
  }
};
