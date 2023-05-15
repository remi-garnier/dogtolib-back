const Joi = require('joi');

module.exports = Joi.object({
  veterinary_id: Joi.number().required(),
});
