const DogtolibError = require('../errors/dogtolib-error');
const { reminder, animal } = require('../models/index.datamapper');
const notif = require('../services/notification.service');
const debug = require('debug')('dogtolib:reminder.controller');

const reminderController = {

  async getReminders(req, res) {
    let reminders;

    // Cas du vétérinaire
    if (req.userRole === 'V') {
      reminders = await reminder.findVeterinaryRemindersByAccountId(req.userId);
    // Cas du propriétaire d'animaux
    } else if (req.userRole === 'O') {
      reminders = await reminder.findAnimalsRemindersByAccountId(req.userId);
    }

    return res.json({ reminders });
  },

  async getAnimalReminders(req, res) {
    const { id } = req.params;
    const reminders = await reminder.findAnimalReminders(id);
    if (reminders.length !== 0 && reminders[0].account_id !== req.userId) {
      throw new DogtolibError('you are not allowed to see this animal reminders', 403);
    }

    return res.json({ reminders });
  },

  async addReminder(req, res) {
    let newReminder;

    // Cas du vétérinaire
    if (req.userRole === 'V') {
      newReminder = await reminder.create({ veterinary_id: req.veterinaryId, ...req.body });
    }

    // Cas du propriétaire d'animaux
    if (req.userRole === 'O') {
      if (!req.body?.animal_id) {
        throw new DogtolibError('animal_id is missing', 400);
      }
      const reminderAnimal = await animal.findByPk(req.body.animal_id);
      // On vérifie que l'animal concerné par le rappel
      // appartient bien à l'utilisateur connecté
      if (reminderAnimal.account_id !== req.userId) {
        throw new DogtolibError('you are not allowed to add a reminder to this animal', 403);
      }

      newReminder = await reminder.create({ ...req.body });
    }
    // Envoi du mail de notification
    await notif.sendNewReminderMail({ ...newReminder, recipient: req.userEmail });

    return res.status(201).json({ reminder: newReminder });
  },

  async patchReminder(req, res) {
    const toPatchReminder = await reminder.findByPk(req.params.id);

    if (!toPatchReminder) {
      res.status(404).json({ reminder: null });
    }
    // Cas du vétérinaire
    if (req.userRole === 'V') {
      if (toPatchReminder.veterinary_id !== req.veterinaryId) {
        throw new DogtolibError('you are not allowed to update this reminder', 403);
      }
    }

    // Cas du propriétaire d'animaux
    if (req.userRole === 'O') {
      const reminderAnimal = await animal.findByPk(toPatchReminder.animal_id);

      if (reminderAnimal.account_id !== req.userId) {
        throw new DogtolibError('you are not allowed to update this reminder', 403);
      }
    }
    const patchedReminder = await reminder.update({ id: req.params.id, ...req.body });
    return res.json({ reminder: patchedReminder });
  },

  async deleteReminder(req, res) {
    const toDeleteReminder = await reminder.findByPk(req.params.id);
    if (req.userRole === 'V') {
      if (toDeleteReminder.veterinary_id !== req.veterinaryId) {
        throw new DogtolibError('you are not allowed to delete this reminder', 403);
      }
    }

    if (req.userRole === 'O') {
      const reminderAnimal = await animal.findByPk(toDeleteReminder.animal_id);
      if (reminderAnimal.account_id !== req.userId) {
        throw new DogtolibError('you are not allowed to delete this reminder', 403);
      }
    }
    await reminder.delete(req.params.id);
    return res.status(204).json();
  },
};

module.exports = reminderController;
