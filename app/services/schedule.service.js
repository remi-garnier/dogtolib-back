const schedule = require('node-schedule');
const debug = require('debug')('app:schedule');
const notif = require('./notification.service');

const { reminder } = require('../models/index.datamapper');

async function printNextReminders() {
  const reminders = await reminder.findUpcomingReminders(1);

  for (const reminder of reminders) {
    debug(`Next reminder: ${reminder.datetime}${reminder.title}${reminder.email}`);
    const info = await notif.sendReminderMailNotification(reminder.email, reminder.title, reminder.label, reminder.datetime);
  }
}

module.exports = schedule.scheduleJob('0 0 7 * * * ', printNextReminders);
