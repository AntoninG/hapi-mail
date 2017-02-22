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
                let socket = request.plugins['hapi-io'].socket;

                if (socket) {
                    request.server._sendResetPassword(user, password).then(ok => {
                        socket.emit('reset-password', null);
                    }).catch(error => {
                        socket.emit('reset-password', error);
                    });
                } else {
                    reply.badImplementation();
                }
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
                let socket = request.plugins['hapi-io'].socket;

                if (socket) {
                    request.server._sendCreation(user, password).then(ok => {
                        socket.emit('send-creation', null);
                    }).catch(error => {
                        socket.emit('send-creation', error);
                    });
                } else {
                    reply.badImplementation();
                }
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
                let socket = request.plugins['hapi-io'].socket;

                if (socket) {
                    request.server._sendCreation(user, password).then(ok => {
                        socket.emit('send-update', null);
                    }).catch(error => {
                        socket.emit('send-update', error);
                    });
                } else {
                    reply.badImplementation();
                }
            }
        }
    ]);
    next();
};

exports.register.attributes = {
    name : 'users-mails-routes'
};