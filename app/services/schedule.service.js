const schedule = require('node-schedule');
const debug = require('debug')('app:schedule');
const mailer = require('./mail.service');
const { reminder } = require('../models/index.datamapper');

async function printNextReminders() {
  const reminders = await reminder.findUpcomingReminders(2);
  const promises = [];
  reminders.forEach((rem) => {
    debug(`Next reminder: ${rem.datetime}${rem.title}${rem.email}`);
    promises.push(mailer.sendMail(rem.email, rem.title, rem.label, rem.datetime));
  });

  Promise.all(promises).then(() => {
    debug('All reminders sent');
  }).catch((error) => {
    debug(error);
  });
}

module.exports = schedule.scheduleJob('*/10 * * * * * ', printNextReminders);
