const Joi = require('joi');

module.exports = Joi.object({
  name: Joi.string().required(),
  birthdate: Joi.date().required(),
  specie: Joi.string().required(),
  breed: Joi.string(),
  memo: Joi.string(),
});
