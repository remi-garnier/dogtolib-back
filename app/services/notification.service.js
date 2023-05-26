const mailer = require('./mail.service');
const debug = require('debug')('app:notification.service');
const renderEmailTemplate = require('../templates/mail.template');

module.exports = {
  /**
   * @summary envoi d'un mail de notification pour un rappel à venir
   */
  sendReminderMailNotification: async (recipient, title, content, datetime) => {
    const reminderDate = new Date(datetime);
    const subject = `Dogtolib: rappel ${title}`;
    const rawBody = ` Vous avez un rappel:\n${title} : ${content}\nle ${reminderDate.toLocaleDateString('fr-FR')} à ${reminderDate.toLocaleTimeString('fr-FR')}`;
    const html = renderEmailTemplate(title, rawBody);
    const result = await mailer.sendMail(recipient, subject, rawBody, html);
    return result;
  },

  /**
   * @summary envoi d'un mail de notification pour un rappel créé
   */
  sendNewReminderMail: async ({
    title, label, datetime, recipient,
  }) => {
    const reminderDate = new Date(datetime);
    const subject = `Dogtolib: nouveau rappel ${title}`;
    const rawBody = `Vous venez d'ajouter un rappel: ${title} : ${label} \nle ${reminderDate.toLocaleDateString('fr-FR')} à ${reminderDate.toLocaleTimeString('fr-FR')}`;
    const html = renderEmailTemplate(title, rawBody);
    const result = await mailer.sendMail(recipient, subject, rawBody, html);
    return result;
  },
};
