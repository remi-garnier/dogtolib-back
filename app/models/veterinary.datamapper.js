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

  async updateVeterinary({ id, ...inputData }) {
    const fieldsAndPlaceholders = [];
    let indexPlaceholder = 1;
    const values = [];

    Object.entries(inputData).forEach(([prop, value]) => {
      fieldsAndPlaceholders.push(`"${prop}" = $${indexPlaceholder}`);
      indexPlaceholder += 1;
      values.push(value);
    });

    values.push(id);

    const preparedQuery = {
      text: `
        UPDATE "${this.tableName}" SET
        ${fieldsAndPlaceholders}
        WHERE account_id = $${indexPlaceholder}
        RETURNING *
      `,
      values,
    };

    const result = await this.client.query(preparedQuery);
    const row = result.rows[0];

    return row;
  }
};
