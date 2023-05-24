const schedule = require('node-schedule');
const debug = require('debug')('app:schedule');
const { reminder } = require('../models/index.datamapper');

async function printNextReminders() {
  const reminders = await reminder.findUpcomingReminders(1);
  reminders.forEach((rem) => {
    debug(`Next reminder: ${rem.datetime}${rem.title}${rem.email}`);
  });
}

module.exports = schedule.scheduleJob('*/10 * * * * * ', printNextReminders);
