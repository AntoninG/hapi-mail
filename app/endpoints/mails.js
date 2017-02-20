'use strict';

const schemaUser = require('../schemas/users');

exports.register = (server, options, next) => {
    server.route([
        {
            method: 'GET',
            path: '/resetPassword',
            config: {
                plugins: {
                    'hapi-io': 'reset-password'
                }
            },
            handler(request, reply) {
                let user = request.payload.user;
                let password = request.payload.password;

                request.server._sendResetPassword(user, password).then(ok => {
                    reply(null);
                }).catch(error => {
                    reply.badImplementation(error.message, error);
                });
            }
        },

        {
            method: 'GET',
            path: '/sendCreation',
            config: {
                plugins: {
                    'hapi-io': 'send-creation'
                }
            },
            handler(request, reply) {
                let user = request.payload.user;
                let password = request.payload.password;

                request.server._sendCreation(user, password).then(ok => {
                    reply(null);
                }).catch(error => {
                    reply.badImplementation(error.message, error);
                });
            }
        },

        {
            method: 'GET',
            path: '/sendUpdate',
            config: {
                plugins: {
                    'hapi-io': 'send-update'
                }
            },
            handler(request, reply) {
                let user = request.payload.user;
                let password = request.payload.password;

                request.server._sendCreation(user, password).then(ok => {
                    reply(null);
                }).catch(error => {
                    reply.badImplementation(error.message, error);
                });
            }
        }
    ]);
};