'use strict';

const handler = require('../handlers/mails');
const Joi     = require('joi');
const schemaUser = require('../schemas/users');

exports.register = (server, options, next) => {
    server.route([
        {
            method  : 'POST',
            path    : '/users/sendCreation',
            config  : {
                description : 'Send a mail to a created user',
                tags        : [ 'api' ],
                plugins     : {
                    'hapi-io': 'send-creation'
                },
                validate    : {
                    payload : {
                        user     : schemaUser,
                        password : Joi.string().regex(/^[a-zA-Z0-9._-]{3,60}$/).min(8).max(60)
                    }
                },
                handler : handler.sendCreationUser
            }
        },

        {
            method  : 'POST',
            path    : '/users/sendUpdate',
            config  : {
                description : 'Send a mail to an updated user with his update credentials',
                tags        : [ 'api' ],
                plugins     : {
                    'hapi-io': 'send-update'
                },
                validate    : {
                    payload : {
                        user: schemaUser
                    }
                },
                handler : handler.sendUpdateUser
            }
        },

        {
            method  : 'POST',
            path    : '/users/resetPassword',
            config  : {
                description : 'Send a mail to a user following his password reset request',
                tags        : [ 'api' ],
                plugins     : {
                    'hapi-io': 'reset-password'
                },
                validate    : {
                    payload : {
                        user     : schemaUser,
                        password : Joi.string().regex(/^[a-zA-Z0-9._-]{3,60}$/).min(8).max(60)
                    }
                },
                handler : handler.sendResetPasswordUser
            }
        },
    ]);
    next();
};

exports.register.attributes = {
    name : 'users-mails-routes'
};