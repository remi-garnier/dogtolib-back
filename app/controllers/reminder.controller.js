const { reminder, animal } = require('../models/index.datamapper');

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

    if (!reminders) {
      return res.status(404).json({ error: 'no reminders found' });
    }

    return res.json({ reminders });
  },

  async getAnimalReminders(req, res) {
    const { id } = req.params;
    const reminders = await reminder.findAnimalReminders(id);
    if (!reminders) {
      return res.status(404).json({ error: 'no reminders found' });
    }
    if (reminders[0].account_id !== req.userId) {
      return res.status(403).json({ error: 'you are not allowed to see this animal reminders' });
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
        return res.status(400).json({ error: 'animal_id is missing' });
      }
      const reminderAnimal = await animal.findByPk(req.body.animal_id);
      // On vérifie que l'animal concerné par le rappel
      // appartient bien à l'utilisateur connecté
      if (reminderAnimal.account_id !== req.userId) {
        return res.status(403).json({ error: 'you are not allowed to add a reminder to this animal' });
      }

      newReminder = await reminder.create({ ...req.body });
    }
    return res.status(201).json({ newReminder });
  },

  async patchReminder(req, res) {
    const toPatchReminder = await reminder.findByPk(req.params.id);
    // Cas du vétérinaire
    if (req.userRole === 'V') {
      if (toPatchReminder.veterinary_id !== req.veterinaryId) {
        return res.status(403).json({ error: 'you are not allowed to update this reminder' });
      }
    }

    // Cas du propriétaire d'animaux
    if (req.userRole === 'O') {
      const reminderAnimal = await animal.findByPk(toPatchReminder.animal_id);

      if (reminderAnimal.account_id !== req.userId) {
        return res.status(403).json({ error: 'you are not allowed to update this reminder' });
      }
    }
    const patchedReminder = await reminder.update({ id: req.params.id, ...req.body });
    return res.json({ reponse: patchedReminder });
  },

  async deleteReminder(req, res) {
    const toDeleteReminder = await reminder.findByPk(req.params.id);
    if (req.userRole === 'V') {
      if (toDeleteReminder.veterinary_id !== req.veterinaryId) {
        return res.status(403).json({ error: 'you are not allowed to delete this reminder' });
      }
    }

    if (req.userRole === 'O') {
      const reminderAnimal = await animal.findByPk(toDeleteReminder.animal_id);
      if (reminderAnimal.account_id !== req.userId) {
        return res.status(403).json({ error: 'you are not allowed to delete this reminder' });
      }
    }
    await reminder.delete(req.params.id);
    return res.status(204).json();
  },
};

module.exports = reminderController;
