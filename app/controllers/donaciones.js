'use strict';

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
            function(error){
                if (error){
                return next(new restify.InvalidArgumentError(
                    JSON.stringify(error)));
                }
                res.send(201,{success:true});
        });
    });
};
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
            JSON.stringify(error)));
        }
        if (donacion) {
            res.send(201,donacion);
        } else {
            res.send(404);
        }
    });
};

/**
 * Crear un donacion
 * @req {function} datos que vienen del servidor cuando buscan el metodo
 * @res {function} datos de respuesta que se envian
 * @next {function} callback que se ejecutara despues del procedimiento
 */
exports.create = function (req, res, next) {
    //TODO avisar a los demas usuarios que se necesita donacion
    var parametros = {};
    parametros = req.body;
    var dataDonacion = {
        creado_por: parametros.creado_por,
        tipo_sangre: parametros.tipo_sangre,
        estado: 'A',
        cantidad_pedida: parametros.cantidad_pedida,
        lugar_donacion : parametros.lugar_donacion
    };
    var donacion = new Donacion(dataDonacion);
    donacion.save(function(error,donacionPost) {
        if (error) {
            return next (new restify.InvalidArgumentError(
                JSON.stringify(error.err)));
        }
        else {
            Usuario.findOne({_id : parametros.creado_por}, function(error,usuario){
                if(error){
                    donacionPost.remove({_id: donacionPost._id}, function(error){
                        return next (new restify.InvalidArgumentError(
                            JSON.stringify(error.err)));
                    });
                }
                else if(!usuario){
                    donacionPost.remove({_id: donacionPost._id}, function(error){
                        return next (new restify.InvalidArgumentError(
                            JSON.stringify(error.err)));
                    });
                }
                else {
                    if (usuario.donaciones_hechas) {
                    usuario.donaciones_pedidas.push(donacionPost._id);
                    }
                    else {
                        usuario.donaciones_pedidas = donacionPost._id;
                    }
                    usuario.save(
                            function(error){
                            if (error){
                                donacionPost.remove({_id: donacionPost._id}, function(error){
                                    return next (new restify.InvalidArgumentError(
                                        JSON.stringify(error.err)));
                                });
                            }
                            res.send(201,{success:true});
                    });
                }
            });
            res.json(donacionPost);
        }
        res.send(201,dataDonacion);
    });
};

/**
 * Actualiza los datos basicos del donacion
 * @req {function} datos que vienen del servidor cuando buscan el metodo
 * @res {function} datos de respuesta que se envian
 * @next {function} callback que se ejecutara despues del procedimiento
 */
exports.update = function(req, res, next) {
    var parametros = {};
    parametros = req.body;
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
};

/**
 * Cambia el estado de una donacion a cancelado
 * @req {function} datos que vienen del servidor cuando buscan el metodo
 * @res {function} datos de respuesta que se envian
 * @next {function} callback que se ejecutara despues del procedimiento
 */
exports.cancelarDonacion = function(req, res, next) {
    var dataDonacion = {
        estado: 'C'
    };
    buscarParaActualizar(res,next,req.params.id,dataDonacion);
};

/**
 * Atender solicitud de donacion
 * @req {function} datos que vienen del servidor cuando buscan el metodo
 * @res {function} datos de respuesta que se envian
 * @next {function} callback que se ejecutara despues del procedimiento
 */
exports.atenderSolicitud = function(req, res, next) {
    var parametros = {};
    parametros = req.body;

    var datosDonacion = {
        hecha_por: parametros.hecha_por
    };

    Donacion.findOne({_id: req.params.id}, function(error, donacion){

        if (donacion.cantidad_pedida <= donacion.cantidad_confirmadas + donacion.cantidad_pendientes) {
            return next (new restify.InvalidArgumentError(
                'Ya se hicieron todas las donaciones necesarias'));
        }
        donacion.cantidad_pendientes++;
        if (donacion.donaciones_hechas) {
            donacion.donaciones_hechas.push(datosDonacion);
        }
        else {
            donacion.donaciones_hechas = datosDonacion;
        }
        donacion.save(function(error,donacionPost) {
            if (error) {
                return next (new restify.InvalidArgumentError(
                    JSON.stringify(error.err)));
            }
            else {
                Usuario.findOne({_id : parametros.hecha_por}, function(error,usuario){
                    if(error){
                        //TODO: Hacer que quite una donacion y borre el usuario
                        return next (new restify.InvalidArgumentError(
                            JSON.stringify(error.err)));
                    }
                    else if(!usuario){
                        //TODO: Hacer que quite una donacion y borre el usuario
                        return next (new restify.InvalidArgumentError(
                            JSON.stringify(error.err)));
                    }
                    else {
                        if (usuario.donaciones_pendientes) {
                        usuario.donaciones_pendientes.push(donacionPost._id);
                        }
                        else {
                            usuario.donaciones_pendientes = donacionPost._id;
                        }
                        usuario.save(
                                function(error){
                                if (error){
                                    //TODO: Hacer que quite una donacion y borre el usuario
                                    return next (new restify.InvalidArgumentError(
                                        JSON.stringify(error.err)));
                                }
                                res.send(201,{success:true});
                        });
                    }
                });
            }
        });
    });
};

/**
 * Agrega o actualiza una de las personas extras
 * @req {function} datos que vienen del servidor cuando buscan el metodo
 * @res {function} datos de respuesta que se envian
 * @next {function} callback que se ejecutara despues del procedimiento
 */
exports.confirmarDonacion = function(req, res, next) {

    var parametros = {};
    parametros = req.body;
    var hechaPor = parametros.hecha_por;
    var idDonacion = req.params.id;
    //TODO validacion usuario no ha donado recientemente
    Donacion.findOne({'_id': idDonacion}, function (error, donacionInit) {
        if (error) {
            return next (new restify.InvalidArgumentError(
                JSON.stringify(error)));
        }
        if (!donacionInit) {
            return next (new restify.InvalidArgumentError('donacion no Existe'));
        }
        else {
            if (donacionInit.cantidad_pendientes -1 < 0) {
                return next (new restify.InvalidArgumentError(
                'La cantidad de pendientes no puede ser menor a 0'));
            }
            donacionInit.cantidad_pendientes--;
            donacionInit.cantidad_confirmadas++;
            if (donacionInit.cantidad_confirmadas === donacionInit.cantidad_pedida) {
                donacionInit.estado = 'F';
            }
            for (var i = donacionInit.donaciones_hechas.length - 1; i >= 0; i--) {
                if (donacionInit.donaciones_hechas[i].hecha_por.toString() === hechaPor.toString() &&
                    donacionInit.donaciones_hechas[i].estado === 'P') {
                    donacionInit.donaciones_hechas[i].estado = 'C';
                    break;
                }
            }
            donacionInit.save(function(error,donacion) {
                if (error) {
                    return next (new restify.InvalidArgumentError(
                        JSON.stringify(error)));
                }
                if (!donacion) {
                    return next (new restify.InvalidArgumentError('donacion no Existe'));
                }
                else {
                    Usuario.findOne({_id: hechaPor}, function (error, usuario) {
                        if (error) {
                            return next (new restify.InvalidArgumentError(
                                JSON.stringify(error)));
                        }
                        if (!usuario) {
                            return next (new restify.InvalidArgumentError('usuario no Existe'));
                        }
                        else {
                            //paso la donacion de pendiente a hecha
                            if(!usuario.donaciones_pendientes) {
                                return next (new restify.InvalidArgumentError(
                                    'No existen donaciones pendientes para confirmar' + hechaPor));
                            }
                            //Si no hay ninguna donacion hecha creo el array
                            if (!usuario.donaciones_hechas) {
                                usuario.donaciones_hechas = [];
                            }
                            var indexDonacionHecha = usuario.donaciones_pendientes.indexOf(idDonacion);
                            usuario.donaciones_pendientes.splice(indexDonacionHecha,1);
                            usuario.donaciones_hechas.push(idDonacion);
                            usuario.save(
                                    function(error){
                                    if (error){
                                        //TODO: Hacer que quite una donacion y borre el usuario
                                        return next (new restify.InvalidArgumentError(
                                            JSON.stringify(error.err)));
                                    }
                                    res.send(201,{success:true});
                            });
                        }
                    });
                }
            });
        }
    });
};

/**
 * Muestra todos los donacions
 * @req {function} datos que vienen del servidor cuando buscan el metodo
 * @res {function} datos de respuesta que se envian
 * @next {function} callback que se ejecutara despues del procedimiento
 */
exports.all = function(req, res, next) {
        Donacion.find({}, function (error, donaciones) {
            if (error){
                //TODO: Hacer que quite una donacion y borre el usuario
                return next (new restify.InvalidArgumentError(
                    JSON.stringify(error.err)));
            }
            res.send(donaciones);
        });
};
