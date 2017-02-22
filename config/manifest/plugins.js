'use strict';

const async = require('async');
const path = require('path');
const envConfig = require('../environments/all');

module.exports.init = server => {
    return new Promise((resolve, reject) => {
        async.series({
            good(done) {
                server.register({
                    register: require('good')
                }, done);
            },
            blipp(done) {
                server.register({
                    register: require('blipp'),
                    options: {
                        showStart: envConfig.log.showRouteAtStart,
                        showAuth: true
                    }
                }, done);
            },
            boom(done) {
                server.register({
                    register: require('hapi-boom-decorators')
                }, done);
            },
            vision(done) {
                server.register({
                    register: require('vision')
                }, done);
            },
            inert(done) {
                server.register({
                    register: require('inert')
                }, done);
            },
            swagger(done) {
                server.register({
                    register: require('hapi-swagger')
                }, done);
            },
            hapiIo(done) {
                server.register({
                    register: require('hapi-io')
                }, done);
            },
            mailer(done) {
                server.register({
                    register: require(path.join(__dirname, '../../app/plugins/mail-sender')),
                    options: {
                        mailConfig: envConfig.mail,
                    }
                }, done);
            }
        }, err => {
            if (err) {
                reject(err);
                return;
            }

            resolve();
        });
    });
};