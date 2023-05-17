const express = require('express');
const reminderControler = require('../controllers/reminder.controller');
const controllerWrapper = require('../utils/controller-wrapper');
const validate = require('../middlewares/validation.middleware');
const addReminderSchema = require('../validation/add-reminder.validation');
const updateReminderSchema = require('../validation/update-reminder.validation');

const reminderRouter = express.Router();

reminderRouter.route('/')
/**
  * GET /reminder
  * @tags Reminder
  * @typedef {object} reminder
  * @summary Renvoi les rappels de l’utilisateur connecté
  * @return {[reminder]} 200 - Un tableau de rappels
  */
  .get(controllerWrapper(reminderControler.getReminders))
/**
 * POST /reminder
 * @tags Reminder
 * @summary ajoute un rappel
 * @param {number} body.animal_id - optionnel id de l'animal concerné
 * @param {string} body.label.required - contenu du rappel
 * @param {string} body.title.required - titre du rappel
 * @param {string} body.datetime.required - date et heure du rappel
 * @return {reminder} 201 - Le rappel créé
 * @return {object} 400 - erreur de validation des données en entrée
 * @return {object} 403 - L'utilisateur n'a pas les droits pour créer un rappel sur cet animal
 */
  .post(validate(addReminderSchema, 'body'), controllerWrapper(reminderControler.addReminder));

reminderRouter.route('/animal/:id(\\d+)')
/**
 * @summary Renvoi les rappels propres à un animal donné
 * @tags Reminder
 * @return {[reminder]} 200 - Un tableau de rappels
 */
  .get(controllerWrapper(reminderControler.getAnimalReminders));

reminderRouter.route('/:id(\\d+)')
/**
 * PATCH /reminder/{id}
 * @tags Reminder
 * @summary ajoute un rappel
 * @param {string} body.label optionnel contenu du rappel
 * @param {string} body.title optionnel titre du rappel
 * @param {string} body.datetime  optionnel date et heure du rappel
 * @param {number} query.id.required - id du rappel
 * @return {reminder} 200 - Le rappel modifié
 * @return {object} 403 - L'utilisateur n'a pas les droits pour modifier ce rappel
 */
  .patch(validate(updateReminderSchema, 'body'), controllerWrapper(reminderControler.patchReminder))

  /**
 * DELETE /reminder/{id}
 * @tags Reminder
 * @summary supprime un rappel
 * @param {number} query.id.required - id du rappel
 * @return {object} 204 - Le rappel a été supprimé
 * @return {object} 403 - L'utilisateur n'a pas les droits pour supprimer ce rappel
 */
  .delete(controllerWrapper(reminderControler.deleteReminder));

module.exports = reminderRouter;
