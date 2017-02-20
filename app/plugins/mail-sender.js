'use strict';

const Nodemailer = require('nodemailer');
const Mailgen    = require('mailgen');
const _          = require('lodash');

const mailSender = {
    _sendMail       : (email, recipient, subject) => {
        let context = {
            text: mailSender._mailGenerator.generatePlaintext(email),
            html: mailSender._mailGenerator.generate(email)
        };

        return new Promise((resolve, reject) => {
            mailer._transporter.sendMail(_.assignIn({
                from    : '"' + mailSender._mailConfig.name + '" <' + mailSender._mailConfig.smtpConfig.auth.user + '>',
                to      : recipient,
                subject : subject
            }, context), (error, info) => {
                if (error) {
                    reject(error);
                }
                resolve(info);
            });
        });
    },
    _sendCreation   : (user, plainPassword) => {
        let email = {
            body: {
                name  : user.firstName + ' ' + user.lastName,
                intro : 'Welcome on API ! We\'re very excited to have you among us.',
                outro : ['Here is you login : ' + user.login, 'And your password : ' + plainPassword]
            }
        };

        let subject = "Welcome on board !";

        return mailSender._sendMail(email, user.email, subject);
    },
    _sendUpdate     : user => {
        let email = {
            body: {
                name  : user.firstName + ' ' + user.lastName,
                intro : 'Your credentials just changed.',
                outro : 'If you didn\'t ask for these changes, please contact our support team.'
            }
        };

        let subject = 'Credentials changing';

        return mailSender._sendMail(email, user.email, subject);
    },
    _sendResetPassword: (user, plainPassword) => {
        let email = {
            body: {
                name  : user.firstName + ' ' + user.lastName,
                intro : 'You asked a password reset',
                outro : 'Here is your new one : ' + plainPassword
            }
        };

        let subject = "Password reset";

        return mailSender._sendMail(email, user.email, subject);
    },

    register: (server, option, next) => {
        mailSender._server      = server;
        mailSender._mailConfig  = server.app.envs.mail.config;
        mailSender._transporter = Nodemailer.createTransport(mailSender._mailConfig.smtpConfig);
        mailSender._mailGenerator = new Mailgen({
            theme: 'salted',
            product: {
                name: 'HAPPY HAPI API',
                link: 'https://www.facebook.com/antonin.guiletdupont'
            }
        });

        server.decorate('server', 'mailer', {
            'sendCreation': mailSender._sendCreation,
            'sendUpdate': mailSender._sendUpdate,
            'sendResetPassword': mailSender._sendResetPassword
        });

        next();
    }
};

module.exports.register = mailSender.register;

module.exports.register.attributes = {
    name: 'mailer',
    version: '0.1.0'
};