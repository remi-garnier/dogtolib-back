const express = require('express');
const reminderControler = require('../controllers/reminder.controller');

const reminderRouter = express.Router();

reminderRouter.route('/')
/**
 * GET /profil
 * @summary Renvoi les rappels des animaux de l’utilisateur connecté
 */
  .get(reminderControler.getReminder)
  .post(reminderControler.postAddReminder);

reminderRouter.route('/vet')
/**
 * @summary Renvoi les rappels du vétérinaire connecté
 */
  .get(reminderControler.getVetReminder);

reminderRouter.route('/animal/:id')
/**
 * @summary Renvoi les rappels propres à un animal donné
 */
  .get(reminderControler.getAnimalReminders);

reminderRouter.route('/:id(\\d+)')
  .patch(reminderControler.patchReminder)
  .delete(reminderControler.deleteReminder);

module.exports = reminderRouter;
