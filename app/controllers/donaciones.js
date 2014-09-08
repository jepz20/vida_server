'use strict'

var mongoose = require('mongoose')
    ,restify = require('restify')
    ,Donacion = mongoose.model('Donacion')
    ,Usuario = mongoose.model('Usuario')
    ,_ = require('lodash');

/**
 *Busca el donacion para actualizar, segun el documento
 *@param {function} res respuesta a enviar de parte del servidor
 *@param {string} id del donacions a actualizar
 *@param {JSON} datosParaActualizar datos para actualizar
 */
var buscarParaActualizar = function(res, next, id, datosParaActualizar) {
    Donacion.findOne({_id: id}, function (error, donacion) {
        if (datosParaActualizar.cantidad_pedida) {
            if (datosParaActualizar.cantidad_pedida < donacion.cantidad_donada){
                return next(new restify.InvalidArgumentError(
                    JSON.stringify('La cantidad pedida no puede ser menor a la cantidad donada')));
            }
        }
        donacion = _.extend(donacion,datosParaActualizar);
        donacion.save(
            function(err, donacion){
                if (err){
                return next(new restify.InvalidArgumentError(
                    JSON.stringify(error)))
                }
                res.send(201,{success:true})
        })
    })
}
/**
 * Muestra un donacion segun su id
 * @req {function} datos que vienen del servidor cuando buscan el metodo
 * @res {function} datos de respuesta que se envian
 * @next {function} callback que se ejecutara despues del procedimiento
 */
exports.show = function (req, res, next) {
    Donacion.findOne({_id:req.params.id}, function (error,donacion) {
        if (error) {
            return next(new restify.InvalidArgumentError(
            JSON.stringify(error)))
        }
        if (donacion) {
            res.send(201,donacion)
        } else {
            res.send(404)
        }
    })
}

/**
 * Crear un donacion
 * @req {function} datos que vienen del servidor cuando buscan el metodo
 * @res {function} datos de respuesta que se envian
 * @next {function} callback que se ejecutara despues del procedimiento
 */
exports.create = function (req, res, next) {
    var parametros = JSON.parse(req.body);
    var dataDonacion = {
        creado_por: parametros.creado_por,
        tipo_sangre: parametros.tipo_sangre,
        estado: 'A',
        cantidad_pedida: parametros.cantidad_pedida,
        lugar_donacion : parametros.lugar_donacion
    }
    var donacion = new Donacion(dataDonacion);
    donacion.save(function(error,donacionPost) {
        if (error) {
            console.log(error);
            return next (new restify.InvalidArgumentError(
                JSON.stringify(error.err)))
        }
        else {
            Usuario.findOne({_id : parametros.creado_por}, function(error,usuario){
                if(error){
                    donacionPost.remove({_id: donacionPost._id}, function(error){
                        return next (new restify.InvalidArgumentError(
                            JSON.stringify(error.err)))
                    })
                }
                else if(!usuario){
                    donacionPost.remove({_id: donacionPost._id}, function(error){
                        return next (new restify.InvalidArgumentError(
                            JSON.stringify(error.err)))
                    })
                }
                else {
                    if (usuario.donaciones_hechas) {
                    usuario.donaciones_hechas.push(donacionPost._id);
                    }
                    else {
                        usuario.donaciones_hechas = donacionPost._id;
                    }
                    usuario.save(
                            function(err, usuario){
                            if (err){
                                donacionPost.remove({_id: donacionPost._id}, function(error){
                                    return next (new restify.InvalidArgumentError(
                                        JSON.stringify(error.err)))
                                })
                            }
                            res.send(201,{success:true})
                    })
                }
            })
            res.json(donacionPost);
        }
        res.send(201,dataDonacion)
    })
}

/**
 * Actualiza los datos basicos del donacion
 * @req {function} datos que vienen del servidor cuando buscan el metodo
 * @res {function} datos de respuesta que se envian
 * @next {function} callback que se ejecutara despues del procedimiento
 */
exports.update = function(req, res, next) {
    var parametros = JSON.parse(req.body);
    var dataDonacion = {};
    if (parametros.cantidad_pedida){
        dataDonacion.cantidad_pedida = parametros.cantidad_pedida;
    }
    if (parametros.lugar_donacion){
        dataDonacion.lugar_donacion = parametros.lugar_donacion;
    }
    if (parametros.tipo_sangre){
        dataDonacion.tipo_sangre = parametros.tipo_sangre;
    }
    buscarParaActualizar(res,next,req.params.id,dataDonacion);
}

/**
 * Cambia el estado de una donacion a cancelado
 * @req {function} datos que vienen del servidor cuando buscan el metodo
 * @res {function} datos de respuesta que se envian
 * @next {function} callback que se ejecutara despues del procedimiento
 */
exports.cancelarDonacion = function(req, res, next) {
    var dataDonacion = {
        estado: 'C'
    }
    buscarParaActualizar(res,next,req.params.id,dataDonacion);
}

/**
 * Atender solicitud de donacion
 * @req {function} datos que vienen del servidor cuando buscan el metodo
 * @res {function} datos de respuesta que se envian
 * @next {function} callback que se ejecutara despues del procedimiento
 */
exports.atenderSolicitud = function(req, res, next) {
    var parametros = JSON.parse(req.body);

    var datosDonacion = {
        hecha_por: parametros.hecha_por
    }

    Donacion.findOne({_id: req.params.id}, function(error, donacion){
        donacion.cantidad_pendientes++;
        if (donacion.cantidad_pedida >= donacion.cantidad_confirmada) {
            return next (new restify.InvalidArgumentError(
                'Ya se hicieron todas las donaciones necesarias'))
        }
        if (donacion.donaciones_hechas) {
            donacion.donaciones_hechas.push(datosDonacion);
        }
        else {
            donacion.donaciones_hechas = datosDonacion;
        }
        donacion.save(function(error,donacionPost) {
            if (error) {
                return next (new restify.InvalidArgumentError(
                    JSON.stringify(error.err)))
            }
            else {
                Usuario.findOne({_id : parametros.hecha_por}, function(error,usuario){
                    if(error){
                        //TODO: Hacer que quite una donacion y borre el usuario
                        return next (new restify.InvalidArgumentError(
                            JSON.stringify(error.err)))
                    }
                    else if(!usuario){
                        //TODO: Hacer que quite una donacion y borre el usuario
                        return next (new restify.InvalidArgumentError(
                            JSON.stringify(error.err)))
                    }
                    else {
                        if (usuario.donaciones_pendientes) {
                        usuario.donaciones_pendientes.push(donacionPost._id);
                        }
                        else {
                            usuario.donaciones_pendientes = donacionPost._id;
                        }
                        usuario.save(
                                function(err, usuario){
                                if (err){
                                    //TODO: Hacer que quite una donacion y borre el usuario
                                    return next (new restify.InvalidArgumentError(
                                        JSON.stringify(error.err)))
                                }
                                res.send(201,{success:true})
                        })
                    }
                })
                res.json(donacionPost);
            }
            res.send(201,dataDonacion)
        })
    })
}

/**
 * Agrega o actualiza una de las personas extras
 * @req {function} datos que vienen del servidor cuando buscan el metodo
 * @res {function} datos de respuesta que se envian
 * @next {function} callback que se ejecutara despues del procedimiento
 */
exports.borrarPersonaExtra = function(req, res, next) {
    var parametros = JSON.parse(req.body);
    var posicion = -1
    Donacion.findOne({_id: req.params.id}, function(error, donacion){
        if (error) {
            return next (new restify.InvalidArgumentError(
                JSON.stringify(error)))
        }
        if (!donacion) {
            return next (new restify.InvalidArgumentError('donacion no Existe'));
        }
        else {
            for (var i = donacion.personas_extras.length - 1; i >= 0; i--) {
                if (donacion.personas_extras[i]._id.toString() === parametros._id.toString()){
                    posicion = i;
                    break;
                }
            }
            if (posicion !== -1) {
                donacion.personas_extras.splice(posicion,-1);
                donacion.save(
                        function(err, donacion){
                        if (err){
                        return next(new restify.InvalidArgumentError(
                            JSON.stringify(error)))
                        }
                        res.send(201,{success:true})
                })
            }
            else {
                return next (new restify.InvalidArgumentError('Persona Extra no Existe'));
            }
        }
    })
 }

/**
 * Agrega o actualiza una de las personas extras
 * @req {function} datos que vienen del servidor cuando buscan el metodo
 * @res {function} datos de respuesta que se envian
 * @next {function} callback que se ejecutara despues del procedimiento
 */
exports.modificarPersonaExtra = function(req, res, next) {
    var parametros = JSON.parse(req.body);
    var posicion = -1
    console.log('parametros._id');
    console.log(parametros._id);
    Donacion.findOne({_id: req.params.id}, function(error, donacion){
        if (error) {
            return next (new restify.InvalidArgumentError(
                JSON.stringify(error)))
        }
        if (!donacion) {
            return next (new restify.InvalidArgumentError('donacion no Existe'));
        }
        else {
            for (var i = donacion.personas_extras.length - 1; i >= 0; i--) {
                if (donacion.personas_extras[i]._id.toString() === parametros._id.toString()){
                    posicion = i;
                    break;
                }
            }
            if (posicion !== -1) {
                if (parametros.nombre){
                    donacion.personas_extras[posicion].nombre = parametros.nombre;
                }
                if (parametros.tipo_sangre) {
                    donacion.personas_extras[posicion].tipo_sangre = parametros.tipo_sangre;
                }
                if (parametros.sexo){
                    donacion.personas_extras[posicion].sexo = parametros.sexo;
                }
                donacion.save(
                    function(err, donacion){
                        if (err){
                        return next(new restify.InvalidArgumentError(
                            JSON.stringify(error)))
                        }
                        res.send(201,{success:true})
                })
            }
            else {
                return next (new restify.InvalidArgumentError('Persona Extra no Existe'));
            }
        }
    })
}


/**
 * Muestra todos los donacions
 * @req {function} datos que vienen del servidor cuando buscan el metodo
 * @res {function} datos de respuesta que se envian
 * @next {function} callback que se ejecutara despues del procedimiento
 */
exports.all = function(req, res, next) {
        Donacion.find({}, function (error, donaciones) {
            res.send(donaciones)
        })
    }
