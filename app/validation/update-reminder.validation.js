const Joi = require('joi');

module.exports = Joi.object({
  title: Joi.string(),
  label: Joi.string(),
  datetime: Joi.date(),
}).min(1);
