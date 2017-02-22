const Joi = require('joi');

/**
 * Schema of a user
 * Required : login, password, email, firstName, lastName
 *
 * @type Joi schema
 */
let schema = Joi.object().keys({
    email    : Joi.string().email().required().example("antonin.guilet@dynadmic.com"),
    firstName: Joi.string().min(2).max(120).required().example("Antonin"),
    lastName : Joi.string().min(2).max(120).required().example("GUILET")
});

module.exports = schema;