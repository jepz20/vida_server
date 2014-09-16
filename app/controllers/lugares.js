'use strict'

var mongoose = require('mongoose')
    ,restify = require('restify')
    ,Lugar = mongoose.model('Lugar')
    ,_ = require('lodash');

/**
 *Busca el lugar para actualizar, segun el documento
 *@param {function} res respuesta a enviar de parte del servidor
 *@param {string} id del lugars a actualizar
 *@param {JSON} datosParaActualizar datos para actualizar
 */
var buscarParaActualizar = function(res,id, datosParaActualizar) {
    Lugar.findOne({_id: id}, function (error, lugar) {
        lugar = _.extend(lugar,datosParaActualizar);
        lugar.save(
            function(err, lugar){
                if (err){
                return next(new restify.InvalidArgumentError(
                    JSON.stringify(error)))
                }
                res.send(201,{success:true})
        })
    })
}
/**
 * Muestra un lugar segun su id
 * @req {function} datos que vienen del servidor cuando buscan el metodo
 * @res {function} datos de respuesta que se envian
 * @next {function} callback que se ejecutara despues del procedimiento
 */
exports.show = function (req, res, next) {
    Lugar.findOne({_id:req.params.id}, function (error,lugar) {
        if (error) {
            return next(new restify.InvalidArgumentError(
            JSON.stringify(error)))
        }
        if (lugar) {
            res.send(201,lugar)
        } else {
            res.send(404)
        }
    })
}

/**
 * Crear un lugar
 * @req {function} datos que vienen del servidor cuando buscan el metodo
 * @res {function} datos de respuesta que se envian
 * @next {function} callback que se ejecutara despues del procedimiento
 */
exports.create = function (req, res, next) {
    var parametros = {}
    parametros = req.body;
    var dataLugar = {
        nombre: parametros.nombre,
        ubicacion: JSON.parse(parametros.ubicacion)
    }
    var lugar = new Lugar(dataLugar);
    lugar.save(function(error,data) {
        if (error) {
            return next (new restify.InvalidArgumentError(
                JSON.stringify(error.err)))
        }
        else {
            res.json(data);
        }
        res.send(201,dataLugar)
    })
}

/**
 * Actualiza los datos basicos del lugar
 * @req {function} datos que vienen del servidor cuando buscan el metodo
 * @res {function} datos de respuesta que se envian
 * @next {function} callback que se ejecutara despues del procedimiento
 */
exports.update = function(req, res, next) {
    var parametros = {}
    parametros = req.body;
    var dataLugar = {};
    if (parametros.nombre){
        dataLugar.nombre = parametros.nombre;
    }
    buscarParaActualizar(res,req.params.id,dataLugar);
}

/**
 * Actualiza la ubicacion del lugar
 * @req {function} datos que vienen del servidor cuando buscan el metodo
 * @res {function} datos de respuesta que se envian
 * @next {function} callback que se ejecutara despues del procedimiento
 */
exports.cambiarUbicacion = function(req, res, next) {
    var parametros = {}
    parametros = req.body;

    var dataLugar = {
        ubicacion: JSON.parse(parametros.ubicacion)
    }
    buscarParaActualizar(res,req.params.id,dataLugar);
}

/**
 * Borra un lugar
 * @req {function} datos que vienen del servidor cuando buscan el metodo
 * @res {function} datos de respuesta que se envian
 * @next {function} callback que se ejecutara despues del procedimiento
 */
exports.destroy = function(req, res, next) {
    Lugar.remove({_id: req.params.id}, function(error,lugar){
        if (error) {
            return next(new restify.InvalidArgumentError(
            JSON.stringify(error)));
        }
        res.send(201,{success:true});
    })
}

/**
 * Muestra todos los lugars
 * @req {function} datos que vienen del servidor cuando buscan el metodo
 * @res {function} datos de respuesta que se envian
 * @next {function} callback que se ejecutara despues del procedimiento
 */
exports.all = function(req, res, next) {
        Lugar.find({}, function (error, lugares) {
            res.send(lugares)
        })
    }
