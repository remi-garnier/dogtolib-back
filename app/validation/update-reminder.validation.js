const Joi = require('joi');

module.exports = Joi.object({
  label: Joi.string(),
  datetime: Joi.date(),
}).min(1);
