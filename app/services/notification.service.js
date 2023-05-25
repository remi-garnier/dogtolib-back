const mailer = require('./mail.service');
const debug = require('debug')('app:notification.service');

module.exports = {
  sendReminderMailNotification: async (recipient, title, content, datetime) => {
    const subject = `Dogtolib: rappel ${title}`;
    const rawBody = `Rappel: ${title} : ${content}  le ${datetime}`;
    const result = await mailer.sendMail(recipient, subject, rawBody);
    return result;
  },

  sendNewReminderMail: async ({
    title, label, datetime, recipient,
  }) => {
    const reminderDate = new Date(datetime);
    const subject = `Dogtolib: nouveau rappel ${title}`;
    const rawBody = `Nouveau rappel: ${title} : ${label} \nle ${reminderDate.toLocaleDateString()} à ${reminderDate.toLocaleTimeString()}`;
    const result = await mailer.sendMail(recipient, subject, rawBody);
    return result;
  },
};
