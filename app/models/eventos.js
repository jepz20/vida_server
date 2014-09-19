'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var Evento = new Schema ({
    nombre: {
        type: String,
        trim: true
    },
    descripcion: {
        type: String,
        trim: true
    },
    fecha_inicio: {
        type: Date
    },
    fecha_fin: {
        type: Date
    },
    estado: {
        type: String,
        default: 'A',
        trim: true
    },
    cantidad_donada: {
        type: Number,
        default: 0
    },
    ubicacion: {
        type: [Number],
        index: '2d'
    },
    logo: {
        type: String,
        trim: true
    }
});

var Evento = mongoose.model('Evento', Evento);

