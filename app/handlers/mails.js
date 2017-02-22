'use strict';

module.exports.sendCreationUser = (request, reply) => {
    let user     = request.payload.user;
    let password = request.payload.password;
    let socket   = request.plugins['hapi-io'].socket;

    if (socket) {
        request.server.mailer.sendCreation(user, password).then(() => {
            reply({});
        }).catch(error => {
            reply.badImplementation(error.message, error);
        });
    } else {
        reply.badImplementation();
    }
};

module.exports.sendUpdateUser = (request, reply) => {
    let user     = request.payload.user;
    let socket   = request.plugins['hapi-io'].socket;

    if (socket) {
        request.server.mailer.sendUpdate(user).then(() => {
            reply({});
        }).catch(error => {
            reply.badImplementation(error.message, error);
        });
    } else {
        reply.badImplementation();
    }
};

module.exports.sendResetPasswordUser = (request, reply) => {
    let user     = request.payload.user;
    let password = request.payload.password;
    let socket   = request.plugins['hapi-io'].socket;

    if (socket) {
        request.server.mailer.sendResetPassword(user, password).then(() => {
            reply({});
        }).catch(error => {
            reply.badImplementation(error.message, error);
        });
    } else {
        reply.badImplementation();
    }
};