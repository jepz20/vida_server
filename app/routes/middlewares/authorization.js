'use strict';

/**
 * Generic require login routing middleware
 */
exports.requiresLogin = function(req, res, next) {
    if (!req.isAuthenticated()) {
        res.redirect('/signin');
    } else {
      next();
    }
};

/**passport.authenticate('basic', { session : false }), usuarios.show);
    server.put('/usuario/:id', usuarios.update);
    server.post('/usuario/cambiar_ubicacion/:id', usuarios.cambiarUbicacion);
    server.post('/usuario/agregar_persona_extra/:id', usuarios.agregarPersonaExtra);
    server.post('/usuario/borrar_persona_extra/:id', usuarios.borrarPersonaExtra);
    server.post('/usuario/modificar_persona_extra/:id', usuarios.modificarPersonaExtra);
    server.del('/usuario/:id', usuarios.destroy);

};


 * Generic require login routing middleware
 */
exports.requiresNoLogin = function(req, res, next) {
    if (req.isAuthenticated()) {
        res.redirect('/');
    } else {
      next();
    }
};

/**
 * middle de seguridad que determina si el usuario es administrador
 */
exports.esAdministrador = function(req, res, next) {
    if (!req.user.administracion ) {
        return res.send(401, 'El usuario no es administrador');
    }
    next();
};


/**
 * middle de seguridad que determina si el usuario es de seguridad
 */
exports.esSeguridad = function(req, res, next) {
    if (!req.user.seguridad ) {
        return res.send(401, 'El usuario no es de seguridas');
    }
    next();
};
