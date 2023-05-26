const Joi = require('joi');

module.exports = Joi.object({
  email: Joi.string()
    .email()
    .required(),
  password: Joi.string()
    .pattern(/^(?=.*[A-Z])(?=.*\d)(?=.*\W).{8,}$/)
    .required(),
  repeat_password: Joi.ref('password'),
  lastname: Joi.string()
    .required(),
  firstname: Joi.string()
    .required(),
  address: Joi.string()
    .required(),
  city: Joi.string()
    .required(),
  zip_code: Joi.string()
    .required(),
  role: Joi.string()
    .required(),
  phone_number: Joi.string().pattern(/^(?:(?:\+|00)33|0)\s*[1-9](?:[\s.-]*\d{2}){4}$/),
}).with('password', 'repeat_password');
