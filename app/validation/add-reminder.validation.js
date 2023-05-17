const Joi = require('joi');

module.exports = Joi.object({
  animal_id: Joi.number(),
  label: Joi.string().required(),
  title: Joi.string().required(),
  datetime: Joi.date().required(),
});
