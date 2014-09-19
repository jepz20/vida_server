'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose')
    ,Schema = mongoose.Schema
    ,crypto = require('crypto')
    ,ObjectId = Schema.ObjectId;

var Usuario = new Schema ({
    email : {
        type: String,
        unique: true,
        index: true,
        trim: true
    },
    nombre: {
        type: String,
        trim: true
    },
    hashed_password: String,
    salt: String,
    facebook: {
        id: {
            type: String,
            trim: true
        },
        token: {
            type: String,
            trim: true
        }
    },
    google: {
        id: {
            type: String,
            trim: true
        },
        token: {
            type: String,
            trim: true
        }
    },
    fecha_ultima_donacion: {
        type: Date
    },
    fecha_proxima_donacion: {
        type: Date
    },
    tipo_sangre: {
        type: String,
        trim: true
    },
    foto: {
        type: String,
        trim: true
    },
    ubicacion: {
        type: [Number],
        index: '2d'
    },
    personas_extras: [{
        nombre: {
            type: String,
            trim: true
        },
        tipo_sangre: {
            type: String,
            trim: true
        },
        foto: {
            type: String,
            trim: true
        },
        sexo: {
            type: String,
            trim: true
        }
    }],
    donaciones_pedidas: [{
        type: ObjectId,
        ref: 'Donacion'
    }],
    donaciones_hechas: [{
        type: ObjectId,
        ref: 'Donacion'
    }],
    donaciones_pendientes: [{
        type: ObjectId,
        ref: 'Donacion'
    }]
});

/**
 * Virtuals
 */
Usuario.virtual('password').set(function(password) {
    this._password = password;
    this.salt = this.makeSalt();
    this.hashed_password = this.encryptPassword(password);
}).get(function() {
    return this._password;
});


// the below 4 validations only apply if you are signing up traditionally
Usuario.path('nombre').validate(function(name) {
    // if you are authenticating by any of the oauth strategies, don't validate
    return (typeof name === 'string' && name.length > 0);
}, 'El nombre no puede estar vacio');

Usuario.path('email').validate(function(email) {
    // if you are authenticating by any of the oauth strategies, don't validate
    return (typeof email === 'string' && email.length > 0);
}, 'El email no puede estar vacio');


/**
 * Methods
 */
Usuario.methods = {
    /**
     * Authenticate - check if the passwords are the same
     *
     * @param {String} plainText
     * @return {Boolean}
     * @api public
     */
    authenticate: function(plainText) {
        return this.encryptPassword(plainText) === this.hashed_password;
    },

    /**
     * Make salt
     *
     * @return {String}
     * @api public
     */
    makeSalt: function() {
        return crypto.randomBytes(16).toString('base64');
    },

    /**
     * Encrypt password
     *
     * @param {String} password
     * @return {String}
     * @api public
     */
    encryptPassword: function(password) {
        if (!password || !this.salt) return '';
        var salt = new Buffer(this.salt, 'base64');
        return crypto.pbkdf2Sync(password, salt, 10000, 64).toString('base64');
    }
};

Usuario.statics.load = function(id, cb) {
    this.findOne({
        _id: id
    },cb);
};


var Usuario = mongoose.model('Usuario', Usuario);

