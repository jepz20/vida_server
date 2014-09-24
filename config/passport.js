'use strict';

var mongoose = require('mongoose')
    ,LocalStrategy = require('passport-local').Strategy
    ,BasicStrategy = require('passport-http').BasicStrategy
    ,FacebookStrategy = require('passport-facebook').Strategy
    ,GoogleStrategy = require('passport-google-oauth').OAuth2Strategy
    ,Usuario = mongoose.model('Usuario')
    ,_ = require('lodash')
    ,config = require('./config');


module.exports = function(passport) {

    passport.use('basic', new BasicStrategy(
        function(username, password, done) {
                Usuario.findOne({
                    email: username
                }, function(err, usuario) {
                    if (err) {
                        return done(err);
                    }
                    if (!usuario) {
                        return done(null, false, {
                            message: 'El usuario no existe, favor verifique'
                        });
                    }
                    if (!usuario.authenticate(password)) {
                        return done(null, false, {
                            message: 'Contraseña incorrecta, favor verifique'
                        });
                    }
                    return done(null, usuario);
                });
        }
    ));

    // Use facebook strategy
    passport.use('facebook', new FacebookStrategy({
            clientID: config.facebook.clientID,
            clientSecret: config.facebook.clientSecret,
            callbackURL: config.facebook.callbackURL
        },
        function(accessToken, refreshToken, profile, done) {
            Usuario.findOne({
                'facebook.id': profile.id
            }, function(err, usuario) {
                if (err) {
                    return done(err);
                }
                if (!usuario) {
                    usuario = new usuario({
                        name: profile.displayName,
                        username: profile.usernames[0].value,
                        usuarioname: profile.usuarioname,
                        provider: 'facebook',
                        facebook: profile._json
                    });
                    usuario.save(function(err) {
                        if (err) console.log(err);
                        return done(err, usuario);
                    });
                } else {
                    return done(err, usuario);
                }
            });
        }
    ));

    // Use google strategy
    passport.use(new GoogleStrategy({
            clientID: config.google.clientID,
            clientSecret: config.google.clientSecret,
            callbackURL: config.google.callbackURL
        },
        function(accessToken, refreshToken, profile, done) {
            usuario.findOne({
                'google.id': profile.id
            }, function(err, usuario) {
                if (!usuario) {
                    usuario = new usuario({
                        name: profile.displayName,
                        username: profile.usernames[0].value,
                        usuarioname: profile.usuarioname,
                        provider: 'google',
                        google: profile._json
                    });
                    usuario.save(function(err) {
                        if (err) console.log(err);
                        return done(err, usuario);
                    });
                } else {
                    return done(err, usuario);
                }
            });
        }
    ));
};
