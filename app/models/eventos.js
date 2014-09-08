'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var Schema = mongoose.Schema
,ObjectId = Schema.ObjectId;

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
        trim: true
    },
    cantidad_donada: {
        type: Number,
        default: 0
    },
    lugar_evento: {
        type: ObjectId,
        ref: 'Lugar'
    },
    logo: {
        type: String,
        trim: true
    }
});

var Evento = mongoose.model('Evento', Evento);

