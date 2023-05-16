const { reminder } = require('../models/index.datamapper');

const reminderController = {

  async getReminders(req, res) {
    let reminders;

    // Si vétérinaraire
    if (req.userRole === 'V') {
      reminders = await reminder.findVeterinaryRemindersByAccountId(req.userId);
    // si propiétaire d'animaux
    } else if (req.userRole === 'O') {
      reminders = await reminder.findAnimalsRemindersByAccountId(req.userId);
    }

    if (!reminders) {
      return res.status(404).json({ error: 'no reminders found' });
    }

    return res.json({ reminders });
  },

  async getVetReminder(req, res) {
    res.json({ reponse: 'reminder veterinaire' });
  },

  async getAnimalReminders(req, res) {
    res.json({ reponse: 'reminders for one animal' });
  },

  async postAddReminder(req, res) {
    res.json({ reponse: 'add a reminder' });
  },

  async patchReminder(req, res) {
    res.json({ reponse: 'update one reminder' });
  },

  async deleteReminder(req, res) {
    res.json({ reponse: 'delete one reminder' });
  },
};

module.exports = reminderController;
