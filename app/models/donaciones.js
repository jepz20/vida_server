'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose')
    ,Schema = mongoose.Schema
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
        trim: true,
        default: 'A'
    },
    cantidad_pedida: {
        type: Number,
        default: 0
    },
    cantidad_pendientes: {
        type: Number,
        default: 0
    },
    cantidad_confirmadas: {
        type: Number,
        default: 0
    },
    lugar_donacion: {
        type: String
        // type: ObjectId,
        // ref: 'Lugar'
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
        },
        estado: {
            type: String,
            trim: true,
            default: 'P'
        }
    }]
});

var Donacion = mongoose.model('Donacion', Donacion);

