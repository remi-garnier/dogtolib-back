const Joi = require('joi');

module.exports = Joi.object({
  name: Joi.string(),
  birthdate: Joi.date(),
  specie: Joi.string(),
  breed: Joi.string(),
  memo: Joi.string(),
}).min(1);
