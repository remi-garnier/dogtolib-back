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
 * @summary ajoute un rappel
 * @param {number} body.animal_id optionnel id de l'animal concerné
 * @param {string} body.label obligatoire contenu du rappel
 * @param {string} body.datetime  obligatoire date et heure du rappel
 */
  .post(controllerWrapper(reminderControler.addReminder));

reminderRouter.route('/animal/:id(\\d+)')
/**
 * @summary Renvoi les rappels propres à un animal donné
 */
  .get(controllerWrapper(reminderControler.getAnimalReminders));

reminderRouter.route('/:id(\\d+)')
  .patch(controllerWrapper(reminderControler.patchReminder))
  .delete(controllerWrapper(reminderControler.deleteReminder));

module.exports = reminderRouter;
