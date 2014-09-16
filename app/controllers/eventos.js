'use strict'

var mongoose = require('mongoose')
    ,restify = require('restify')
    ,Evento = mongoose.model('Evento')
    ,_ = require('lodash');

/**
 *Busca el evento para actualizar, segun el documento
 *@param {function} res respuesta a enviar de parte del servidor
 *@param {string} id del eventos a actualizar
 *@param {JSON} datosParaActualizar datos para actualizar
 */
var buscarParaActualizar = function(res,id, datosParaActualizar) {
    Evento.findOne({_id: id}, function (error, evento) {
        evento = _.extend(evento,datosParaActualizar);
        evento.save(
            function(err, evento){
                if (err){
                return next(new restify.InvalidArgumentError(
                    JSON.stringify(error)))
                }
                res.send(201,{success:true})
        })
    })
}
/**
 * Muestra un evento segun su id
 * @req {function} datos que vienen del servidor cuando buscan el metodo
 * @res {function} datos de respuesta que se envian
 * @next {function} callback que se ejecutara despues del procedimiento
 */
exports.show = function (req, res, next) {
    Evento.findOne({_id:req.params.id}, function (error,evento) {
        if (error) {
            return next(new restify.InvalidArgumentError(
            JSON.stringify(error)))
        }
        if (evento) {
            res.send(201,evento)
        } else {
            res.send(404)
        }
    })
}

/**
 * Crear un evento
 * @req {function} datos que vienen del servidor cuando buscan el metodo
 * @res {function} datos de respuesta que se envian
 * @next {function} callback que se ejecutara despues del procedimiento
 */
exports.create = function (req, res, next) {
    var parametros = {}
    parametros = req.body;
    var dataEvento = {
        nombre: parametros.nombre,
        descripcion: parametros.descripcion,
        fecha_inicio: parametros.fecha_inicio,
        fecha_fin: parametros.fecha_fin,
        ubicacion: JSON.parse(parametros.ubicacion)
    }
    var evento = new Evento(dataEvento);
    evento.save(function(error,data) {
        if (error) {
            return next (new restify.InvalidArgumentError(
                JSON.stringify(error.err)))
        }
        else {
            res.json(data);
        }
        res.send(201,dataEvento)
    })
}

/**
 * Actualiza los datos basicos del evento
 * @req {function} datos que vienen del servidor cuando buscan el metodo
 * @res {function} datos de respuesta que se envian
 * @next {function} callback que se ejecutara despues del procedimiento
 */
exports.update = function(req, res, next) {
    var parametros = {}
    parametros = req.body;
    var dataEvento = {};
    if (parametros.nombre){
        dataEvento.nombre = parametros.nombre;
    }
    if (parametros.descripcion){
        dataEvento.descripcion = parametros.descripcion;
    }
    if (parametros.fecha_inicio){
        dataEvento.fecha_inicio = parametros.fecha_inicio;
    }
    if (parametros.fecha_fin){
        dataEvento.fecha_fin = parametros.fecha_fin;
    }
    if (parametros.ubicacion){
        dataEvento.ubicacion = JSON.parse(parametros.ubicacion);
    }
    buscarParaActualizar(res,req.params.id,dataEvento);
}

/**
 * Actualiza la ubicacion del evento
 * @req {function} datos que vienen del servidor cuando buscan el metodo
 * @res {function} datos de respuesta que se envian
 * @next {function} callback que se ejecutara despues del procedimiento
 */
exports.cancelarEvento = function(req, res, next) {

    var dataEvento = {
        estado: 'C'
    }
    buscarParaActualizar(res,req.params.id,dataEvento);
}

/**
 * Borra un evento
 * @req {function} datos que vienen del servidor cuando buscan el metodo
 * @res {function} datos de respuesta que se envian
 * @next {function} callback que se ejecutara despues del procedimiento
 */
exports.destroy = function(req, res, next) {
    Evento.remove({_id: req.params.id}, function(error,evento){
        if (error) {
            return next(new restify.InvalidArgumentError(
            JSON.stringify(error)));
        }
        res.send(201,{success:true});
    })
}

/**
 * Muestra todos los eventos
 * @req {function} datos que vienen del servidor cuando buscan el metodo
 * @res {function} datos de respuesta que se envian
 * @next {function} callback que se ejecutara despues del procedimiento
 */
exports.all = function(req, res, next) {
        Evento.find({}, function (error, eventoes) {
            res.send(eventoes)
        })
    }
