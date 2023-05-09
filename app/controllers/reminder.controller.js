const reminderController = {

  async getReminder(req, res) {
    res.json({ reponse: 'reminder animals from user' });
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
