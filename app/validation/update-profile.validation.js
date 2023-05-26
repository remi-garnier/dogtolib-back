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
  phone_number: Joi.string().pattern(/^(?:(?:\+|00)33|0)\s*[1-9](?:[\s.-]*\d{2}){4}$/),
  opening_hour: Joi.string().regex(/^([01]?\d|2[0-3]):?([0-5]\d)$/),
  closing_hour: Joi.string().regex(/^([01]?\d|2[0-3]):?([0-5]\d)$/),
  payment_modes: Joi.string(),
}).min(1).with('password', 'repeat_password');
