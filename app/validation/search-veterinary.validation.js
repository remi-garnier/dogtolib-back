const Joi = require('joi');

module.exports = Joi.object({
  name: Joi.string(),
  city: Joi.string(),
}).min(1);
