const reminderController = {

  getReminder: function async(req, res) {
    res.json({ reponse: 'reminder animals from user' });
  },

  getVetReminder: function async(req, res) {
    res.json({ reponse: 'reminder veterinaire' });
  },

  getAnimalReminders: function async(req, res) {
    res.json({ reponse: 'reminders for one animal' });
  },

  postAddReminder: function async(req, res) {
    res.json({ reponse: 'add a reminder' });
  },

  patchReminder: function async(req, res) {
    res.json({ reponse: 'update one reminder' });
  },

  deleteReminder: function async(req, res) {
    res.json({ reponse: 'delete one reminder' });
  },
};

module.exports = reminderController;
