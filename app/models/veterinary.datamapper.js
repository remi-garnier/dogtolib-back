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
            TO_CHAR(TO_TIMESTAMP(${this.tableName}.opening_hour::TEXT, 'HH24:MI:SS'), 'HH24:MI') AS opening_hour,
            TO_CHAR(TO_TIMESTAMP(${this.tableName}.closing_hour::TEXT, 'HH24:MI:SS'), 'HH24:MI') AS closing_hour,
            ${this.tableName}.payment_modes as payment_modes
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
              TO_CHAR(TO_TIMESTAMP(${this.tableName}.opening_hour::TEXT, 'HH24:MI:SS'), 'HH24:MI') AS opening_hour,
              TO_CHAR(TO_TIMESTAMP(${this.tableName}.closing_hour::TEXT, 'HH24:MI:SS'), 'HH24:MI') AS closing_hour
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

  async searchVeterinary(lastname, city) {
    const preparedQuery = {
      text: `SELECT
            account.lastname AS lastname,
            account.firstname AS firstname,
            account.email AS email,
            account.phone_number AS phone_number,
            account.address AS address,
            account.city AS city,
            regexp_replace(account.city, '-', ' ', 'g') AS formatted_city,
            account.zip_code AS zip_code,
            ${this.tableName}.id AS veterinary_id,
            ${this.tableName}.payment_modes AS payment_modes,
            TO_CHAR(TO_TIMESTAMP(${this.tableName}.opening_hour::TEXT, 'HH24:MI:SS'), 'HH24:MI') AS opening_hour,
            TO_CHAR(TO_TIMESTAMP(${this.tableName}.closing_hour::TEXT, 'HH24:MI:SS'), 'HH24:MI') AS closing_hour
            FROM ${this.tableName}
            JOIN account ON account.id = ${this.tableName}.account_id
            WHERE 
            CASE 
              WHEN $1 = '' THEN regexp_replace(account.city, '-', ' ', 'g') ILIKE '%' || $2 || '%'
              WHEN $2 = '' THEN account.lastname ILIKE '%' || $1 || '%'
              ELSE account.lastname ILIKE '%' || $1 || '%' OR regexp_replace(account.city, '-', ' ', 'g') ILIKE '%' || $2 || '%'
            END
            ORDER BY
              CASE
                WHEN regexp_replace(account.city, '-', ' ', 'g') ILIKE $2 AND account.lastname ILIKE $1 THEN 1
                WHEN regexp_replace(account.city, '-', ' ', 'g') ILIKE $2 AND (account.lastname ILIKE $1 || '%' OR account.lastname ILIKE '%' || $1) OR
                account.lastname ILIKE $1 AND (regexp_replace(account.city, '-', ' ', 'g') ILIKE $2 || '%' OR regexp_replace(account.city, '-', ' ', 'g') ILIKE '%' || $1) THEN 2
                WHEN regexp_replace(account.city, '-', ' ', 'g') ILIKE $2 OR account.lastname ILIKE $1 THEN 3
                WHEN regexp_replace(account.city, '-', ' ', 'g') ILIKE $2 || '%' AND account.lastname ILIKE $1 || '%' THEN 4
                WHEN regexp_replace(account.city, '-', ' ', 'g') ILIKE $2 || '%' OR account.lastname ILIKE $1 || '%' THEN 5
                WHEN regexp_replace(account.city, '-', ' ', 'g') ILIKE '%' || $2 AND account.lastname ILIKE '%' || $1 THEN 6
                WHEN regexp_replace(account.city, '-', ' ', 'g') ILIKE '%' || $2 OR account.lastname ILIKE '%' || $1  THEN 7
                ELSE 8
                END,
              formatted_city,
              account.lastname;`,
      values: [lastname, city],
    };

    const searchResult = await this.client.query(preparedQuery);

    if (searchResult.rowCount === 0) {
      return null;
    }

    return searchResult.rows;
  }
};
