require('dotenv').config();
const { faker } = require('@faker-js/faker/locale/fr');
const { Client } = require('pg');
const pgFormat = require('pg-format');
const { hashPassword } = require('../app/utils/password');

const client = new Client({
  host: process.env.PG_HOST,
  user: process.env.PG_USER,
  password: process.env.PG_PASSWORD,
  database: process.env.PG_DATABASE,
  ssl: {
    rejectUnauthorized: false,
  },
});

client.connect();

const password = 'test';

function createRandomUser(role) {
  return {
    email: faker.internet.email(),
    firstName: faker.person.firstName(),
    lastName: faker.person.lastName(),
    phone_number: faker.phone.number(),
    address: faker.location.streetAddress(),
    city: faker.location.city(),
    zip_code: faker.location.zipCode(),
    role,
  };
}
(async () => {
  const hashedPass = await hashPassword(password);
  const insertAccountQuery = `INSERT INTO "account" ("email", "firstname", "lastname", "phone_number", "password", "address", "zip_code", "city", "role")
                               VALUES %L
                               RETURNING *`;
  const accountData = [];
  for (let i = 0; i < 200; i++) {
    const user = createRandomUser('V');
    accountData.push([user.email, user.firstName, user.lastName, user.phone_number, hashedPass, user.address, user.zip_code, user.city, user.role]);
  }

  const newAccounts = (await client.query(pgFormat(insertAccountQuery, accountData), [])).rows;

  const openingHours = ['07:00', '08:00', '09:00', '10:00', '11:00', '12:00'];
  const closingHours = ['14:00', '15:00', '16:00', '17:00', '18:00', '19:00'];
  const paymentModes = ['CB', 'Chèque', 'Espèce', 'CB, espèces', 'CB, chèque', 'CB, chèque, espèces'];
  const insertVeterinaryQuery = `INSERT INTO "veterinary" ("account_id", "opening_hour", "closing_hour", "payment_modes")
                                VALUES %L`;

  const veterinaryData = [];
  newAccounts.forEach((account) => {
    const paymentMode = faker.helpers.arrayElement(paymentModes);
    const openingHour = faker.helpers.arrayElement(openingHours);
    const closingHour = faker.helpers.arrayElement(closingHours);
    veterinaryData.push([account.id, openingHour, closingHour, paymentMode]);
  });
  await client.query(pgFormat(insertVeterinaryQuery, veterinaryData), []);
  console.log('Veterinaries created');
})();
