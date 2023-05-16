const express = require('express');
const reminderControler = require('../controllers/reminder.controller');
const controllerWrapper = require('../utils/controller-wrapper');

const reminderRouter = express.Router();

reminderRouter.route('/')
/**
  * GET /reminder
  * @summary Renvoi les rappels de l’utilisateur connecté
  */
  .get(controllerWrapper(reminderControler.getReminders))
/**
 * POST /reminder
 * @ ajoute un rappel
 */
  .post(controllerWrapper(reminderControler.postAddReminder));

reminderRouter.route('/animal/:id')
/**
 * @summary Renvoi les rappels propres à un animal donné
 */
  .get(controllerWrapper(reminderControler.getAnimalReminders));

reminderRouter.route('/:id(\\d+)')
  .patch(controllerWrapper(reminderControler.patchReminder))
  .delete(controllerWrapper(reminderControler.deleteReminder));

module.exports = reminderRouter;
