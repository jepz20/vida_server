'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var Schema = mongoose.Schema
,ObjectId = Schema.ObjectId;

var Lugar = new Schema ({
    nombre: {
        type: String,
        trim: true
    },
    fecha_agregado: {
        type: Date,
        default: Date.now
    },
    ubicacion: {
        type: [Number],
        index: '2d'
    }
});

var Lugar = mongoose.model('Lugar', Lugar);

