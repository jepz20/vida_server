'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var Schema = mongoose.Schema
,ObjectId = Schema.ObjectId;

var Donacion = new Schema ({
    creado_por : {
        type: ObjectId,
        ref: 'Usuario'
    },
    tipo_sangre: {
        type: String,
        trim: true
    },
    fecha_solicitud: {
        type: Date,
        default: Date.now
    },
    estado: {
        type: String,
        trim: true
    },
    cantidad_pedida: {
        type: Number,
        default: 0
    },
    cantidad_donada: {
        type: Number,
        default: 0
    },
    lugar_donacion: {
        type: ObjectId,
        ref: 'Lugar'
    },
    donaciones_hechas: [{
        fecha_donacion: {
            type: Date,
            default: Date.now
        },
        hecha_por: {
            type: ObjectId,
            ref: 'Usuario'
        },
        comprobante: {
            type: String,
            trim: true
        }
    }]
});

var Donacion = mongoose.model('Donacion', Donacion);

