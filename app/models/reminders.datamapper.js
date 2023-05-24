const CoreDatamapper = require('./core.datamapper');

module.exports = class Reminder extends CoreDatamapper {
  tableName = 'reminder';

  /**
  * @summary renvoi les rappels d'un vétérinaire
  * @param {number} accountID l'id du compte du vétérinaire
  */
  async findVeterinaryRemindersByAccountId(accountId) {
    const preparedQuery = {
      text: `SELECT 
        reminder.id as id,
        reminder.veterinary_id as veterinary_id,
        reminder.title as title,
        reminder.label as label,
        TO_CHAR(reminder.datetime, 'DD/MM/YYYY HH24:MI') as datetime
      FROM ${this.tableName}
      JOIN veterinary ON veterinary.id = reminder.veterinary_id
      JOIN account ON account.id = veterinary.account_id
      WHERE account.id = $1
      ORDER BY reminder.datetime ASC`,
      values: [accountId],
    };

    const result = await this.client.query(preparedQuery);

    return result.rows;
  }

  /**
  * @summary renvoi les rappels des animaux d'un propriétaire
  * @param {number} accountID l'id du compte du propriétaire
  */
  async findAnimalsRemindersByAccountId(accountId) {
    const preparedQuery = {
      text: `SELECT
        reminder.id as id,
        reminder.animal_id as animal_id,
        reminder.title as title,
        reminder.label as label,
        TO_CHAR(reminder.datetime, 'DD/MM/YYYY HH24:MI') as datetime,
        animal.name as animal_name
        FROM ${this.tableName}
        JOIN animal ON animal.id = reminder.animal_id
        JOIN account ON account.id = animal.account_id
        WHERE account.id = $1
        ORDER BY reminder.datetime ASC`,
      values: [accountId],
    };
    const result = await this.client.query(preparedQuery);

    return result.rows;
  }

  async findAnimalReminders(animalId) {
    const preparedQuery = {
      text: `SELECT 
      reminder.id as id,
      reminder.animal_id as animal_id,
      reminder.title as title,
      reminder.label as label,
      TO_CHAR(reminder.datetime, 'DD/MM/YYYY HH24:MI') as datetime,
      animal.account_id as account_id
      FROM ${this.tableName}
      JOIN animal ON animal.id = reminder.animal_id
      WHERE ${this.tableName}.animal_id = $1
      ORDER BY reminder.datetime ASC`,
      values: [animalId],
    };
    const result = await this.client.query(preparedQuery);

    return result.rows;
  }

  async findUpcomingReminders(days) {
    const preparedQuery = {
      text: `SELECT 
              animal.name, 
              TO_CHAR(reminder.datetime, 'DD/MM/YYYY HH24:MI') as datetime, 
              coalesce(account.email, vetAccount.email) as email , 
              reminder.label, 
              reminder.title 
            FROM reminder
            LEFT JOIN animal ON reminder.animal_id = animal.id
            LEFT JOIN account ON animal.account_id = account.id
            LEFT JOIN veterinary ON reminder.veterinary_id = veterinary.id 
            LEFT JOIN account vetAccount ON veterinary.account_id = vetAccount.id
            WHERE date(datetime) = date(now() + interval '1 day' * $1)`,
      values: [days],
    };
    const result = await this.client.query(preparedQuery);
    return result.rows;
  }
};
