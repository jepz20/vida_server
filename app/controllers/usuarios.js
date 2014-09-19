'use strict';

var mongoose = require('mongoose')
    ,restify = require('restify')
    ,Usuario = mongoose.model('Usuario')
    ,_ = require('lodash');

/**
 *Busca el usuario para actualizar, segun el documento
 *@param {function} res respuesta a enviar de parte del servidor
 *@param {string} id del usuarios a actualizar
 *@param {JSON} datosParaActualizar datos para actualizar
 */
var buscarParaActualizar = function(res,next,id, datosParaActualizar) {
    Usuario.findOne({_id: id}, function (error, usuario) {
        usuario = _.extend(usuario,datosParaActualizar);
        usuario.save(
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
 * Muestra un usuario segun su id
 * @req {function} datos que vienen del servidor cuando buscan el metodo
 * @res {function} datos de respuesta que se envian
 * @next {function} callback que se ejecutara despues del procedimiento
 */
exports.show = function (req, res, next) {
    Usuario.findOne({_id:req.params.id}, function (error,usuario) {
        if (error) {
            return next(new restify.InvalidArgumentError(
            JSON.stringify(error)));
        }
        if (usuario) {
            res.send(201,usuario);
        } else {
            res.send(404);
        }
    });
};

/**
 * Crear un usuario
 * @req {function} datos que vienen del servidor cuando buscan el metodo
 * @res {function} datos de respuesta que se envian
 * @next {function} callback que se ejecutara despues del procedimiento
 */
exports.create = function (req, res, next) {
    var parametros = {};
    parametros = req.body;
    console.log('parametros');
    console.log(parametros);
    var dataUsuario = {
        email: parametros.email,
        nombre: parametros.nombre,
        tipo_sangre: parametros.tipo_sangre,
        foto: parametros.foto,
        ubicacion: JSON.parse(parametros.ubicacion),
        password: parametros.password
    };
    var usuario = new Usuario(dataUsuario);
    usuario.save(function(error,data) {
        if (error) {
            console.log(error);
            return next (new restify.InvalidArgumentError(
                JSON.stringify(error.err)));
        }
        else {
            res.json(data);
        }
        res.send(201,dataUsuario);
    });
};

/**
 * Actualiza los datos basicos del usuario
 * @req {function} datos que vienen del servidor cuando buscan el metodo
 * @res {function} datos de respuesta que se envian
 * @next {function} callback que se ejecutara despues del procedimiento
 */
exports.update = function(req, res, next) {
    var parametros = {};
    parametros = req.body;
    var dataUsuario = {};
    if (parametros.email){
        dataUsuario.email = parametros.email;
    }
    if (parametros.nombre){
        dataUsuario.nombre = parametros.nombre;
    }
    if (parametros.tipo_sangre){
        dataUsuario.tipo_sangre = parametros.tipo_sangre;
    }
    buscarParaActualizar(res,next,req.params.id,dataUsuario);
};

/**
 * Actualiza los datos basicos del usuario
 * @req {function} datos que vienen del servidor cuando buscan el metodo
 * @res {function} datos de respuesta que se envian
 * @next {function} callback que se ejecutara despues del procedimiento
 */
exports.cambiarUbicacion = function(req, res, next) {
    var parametros = {};
    parametros = req.body;

    var dataUsuario = {
        ubicacion: JSON.parse(parametros.ubicacion)
    };
    buscarParaActualizar(res,next,req.params.id,dataUsuario);
};



/**
 * Agrega o actualiza una de las personas extras
 * @req {function} datos que vienen del servidor cuando buscan el metodo
 * @res {function} datos de respuesta que se envian
 * @next {function} callback que se ejecutara despues del procedimiento
 */
exports.agregarPersonaExtra = function(req, res, next) {
    var parametros = {};
    parametros = req.body;

    var persona_extra = {
            nombre: parametros.nombre,
            tipo_sangre: parametros.tipo_sangre,
            sexo: parametros.sexo
        };
    Usuario.findOne({_id: req.params.id}, function(error, usuario){
        if (error) {
            return next (new restify.InvalidArgumentError(
                JSON.stringify(error)));
        }
        if (!usuario) {
            return next (new restify.InvalidArgumentError('Usuario no Existe'));
        }
        else {
            if (usuario.personas_extras) {
                usuario.personas_extras.push(persona_extra);
            }
            else {
                usuario.personas_extras = persona_extra;
            }
            usuario.save(
                    function(error){
                    if (error){
                    return next(new restify.InvalidArgumentError(
                        JSON.stringify(error)));
                    }
                    res.send(201,{success:true});
            });
        }
    });
};

/**
 * Agrega o actualiza una de las personas extras
 * @req {function} datos que vienen del servidor cuando buscan el metodo
 * @res {function} datos de respuesta que se envian
 * @next {function} callback que se ejecutara despues del procedimiento
 */
exports.borrarPersonaExtra = function(req, res, next) {
    var parametros = {};
    parametros = req.body;
    var posicion = -1;
    Usuario.findOne({_id: req.params.id}, function(error, usuario){
        if (error) {
            return next (new restify.InvalidArgumentError(
                JSON.stringify(error)));
        }
        if (!usuario) {
            return next (new restify.InvalidArgumentError('Usuario no Existe'));
        }
        else {
            for (var i = usuario.personas_extras.length - 1; i >= 0; i--) {
                if (usuario.personas_extras[i]._id.toString() === parametros._id.toString()){
                    posicion = i;
                    break;
                }
            }
            if (posicion !== -1) {
                usuario.personas_extras.splice(posicion,-1);
                usuario.save(
                        function(error){
                        if (error){
                        return next(new restify.InvalidArgumentError(
                            JSON.stringify(error)));
                        }
                        res.send(201,{success:true});
                });
            }
            else {
                return next (new restify.InvalidArgumentError('Persona Extra no Existe'));
            }
        }
    });
};

/**
 * Agrega o actualiza una de las personas extras
 * @req {function} datos que vienen del servidor cuando buscan el metodo
 * @res {function} datos de respuesta que se envian
 * @next {function} callback que se ejecutara despues del procedimiento
 */
exports.modificarPersonaExtra = function(req, res, next) {
    var parametros = {};
    parametros = req.body;
    var posicion = -1;
    Usuario.findOne({_id: req.params.id}, function(error, usuario){
        if (error) {
            return next (new restify.InvalidArgumentError(
                JSON.stringify(error)));
        }
        if (!usuario) {
            return next (new restify.InvalidArgumentError('Usuario no Existe'));
        }
        else {
            for (var i = usuario.personas_extras.length - 1; i >= 0; i--) {
                if (usuario.personas_extras[i]._id.toString() === parametros._id.toString()){
                    posicion = i;
                    break;
                }
            }
            if (posicion !== -1) {
                if (parametros.nombre){
                    usuario.personas_extras[posicion].nombre = parametros.nombre;
                }
                if (parametros.tipo_sangre) {
                    usuario.personas_extras[posicion].tipo_sangre = parametros.tipo_sangre;
                }
                if (parametros.sexo){
                    usuario.personas_extras[posicion].sexo = parametros.sexo;
                }
                usuario.save(
                    function(error){
                        if (error){
                        return next(new restify.InvalidArgumentError(
                            JSON.stringify(error)));
                        }
                        res.send(201,{success:true});
                });
            }
            else {
                return next (new restify.InvalidArgumentError('Persona Extra no Existe'));
            }
        }
    });
};




/**
 * Borra un usuario
 * @req {function} datos que vienen del servidor cuando buscan el metodo
 * @res {function} datos de respuesta que se envian
 * @next {function} callback que se ejecutara despues del procedimiento
 */
exports.destroy = function(req, res, next) {
    Usuario.remove({_id: req.params.id}, function(error){
        if (error) {
            return next(new restify.InvalidArgumentError(
            JSON.stringify(error)));
        }
        res.send(201,{success:true});
    });
};

/**
 * Muestra todos los usuarios
 * @req {function} datos que vienen del servidor cuando buscan el metodo
 * @res {function} datos de respuesta que se envian
 * @next {function} callback que se ejecutara despues del procedimiento
 */
exports.all = function(req, res, next) {
    Usuario.find({}, function (error, usuarios) {
        if (error) {
            return next(new restify.InvalidArgumentError(
            JSON.stringify(error)));
        }
        res.send(usuarios);
    });
};
