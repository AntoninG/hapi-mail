const Joi = require('joi');

/**
 * Schema of a user
 * Required : login, password, email, firstName, lastName
 *
 * @type Joi schema
 */
let schema = Joi.object().keys({
    login    : Joi.string().regex(/^[a-zA-Z0-9._-]{3,30}$/).min(3).max(30).required().example("Antonin"),
    email    : Joi.string().email().required().example("aguilet@dynadmic.com"),
    firstName: Joi.string().min(2).max(120).required().example("Antonin"),
    lastName : Joi.string().min(2).max(120).required().example("GUILET")
});

module.exports = schema;