const schedule = require('node-schedule');
const debug = require('debug')('app:schedule');
const notif = require('./notification.service');

const { reminder } = require('../models/index.datamapper');

async function notifyNextReminders() {
  // Récupérer les rappels dont la date est dans 1 jour
  console.log(process.env.REMINDER_NOTIF_DELAY);
  console.log(typeof process.env.REMINDER_NOTIF_DELAY);
  const reminders = await reminder.findUpcomingReminders(process.env.REMINDER_NOTIF_DELAY);

  // Envoyer un mail pour chaque rappel
  const remindersPromises = reminders.map((reminderToSend) => notif.sendReminderMailNotification(
    reminderToSend.email,
    reminderToSend.title,
    reminderToSend.label,
    reminderToSend.datetime,
  ));

  try {
    const responses = await Promise.all(remindersPromises);
    debug(`${remindersPromises.length} potentiellement envoyés.`);
  } catch (err) {
    debug(err);
  }

  // ? Idées pour notifications Android/iOS
  // reminders.forEach((reminderToSend) => {
  //   fetch(`https://ntfy.sh/dogtolib_${reminderToSend.email}`, {
  //     method: 'POST',
  //     body: reminderToSend.label,
  //     headers: {
  //       Title: reminderToSend.title,
  //       Priority: 'urgent',
  //       Tags: 'calendar',
  //     },
  //   });
  // });
}
// module.exports = notifyNextReminders;
// Tâche d'envoi des notifications tous les jours à 7h
module.exports = schedule.scheduleJob('0 0 7 * * * ', notifyNextReminders);
