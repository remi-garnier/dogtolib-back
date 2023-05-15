const Joi = require('joi');

module.exports = Joi.object({
  email: Joi.string()
    .email(),
  password: Joi.string()
    .pattern(/^(?=.*[A-Z])(?=.*\d)(?=.*\W).{8,}$/),
  repeat_password: Joi.ref('password'),
  lastname: Joi.string(),
  firstname: Joi.string(),
  address: Joi.string(),
  city: Joi.string(),
  zip_code: Joi.string(),
  role: Joi.string(),
  phone_number: Joi.string(),
}).min(1).with('password', 'repeat_password');
