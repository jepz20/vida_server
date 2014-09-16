'use strict';

module.exports = {
    db: "mongodb://localhost/vida-dev",
    app: {
        name: "Vida-- Donacion de Sangre"
    },
    facebook: {
        clientID: "367208613382846",
        clientSecret: "a601753190447a135ad938aa7f41cec1",
        callbackURL: "http://localhost:2222/auth/facebook/callback"
    },
    google: {
        clientID: "349006955085-9s64ogeagcr04frducjft355fi4rjv2n.apps.googleusercontent.com",
        clientSecret: "i5lRlptXzfoKkeZ4SZqi3yMB",
        callbackURL: "http://localhost:2222/auth/google/callback"
    }
}
