'use strict';

var usuarios = require('../controllers/usuarios');
// var authorization = require('./middlewares/authorization');


// // Categorias authorization helpers
// var hasAuthorization = function(req, res, next) {
//  if (req.categoria.user.id !== req.user.id) {
//      return res.send(401, 'User is not authorized');
//  }
//     next();
// };

module.exports = function(server, passport) {
    var isAuthenticated = passport.authenticate('basic', { session : false });
    server.get('/usuario', usuarios.all);
    server.post('/usuario', usuarios.create);
    server.get('/usuario/:id', isAuthenticated, usuarios.show);
    server.put('/usuario/:id', isAuthenticated, usuarios.update);
    server.post('/usuario/cambiar_ubicacion/:id', usuarios.cambiarUbicacion);
    server.post('/usuario/agregar_persona_extra/:id', usuarios.agregarPersonaExtra);
    server.post('/usuario/borrar_persona_extra/:id', usuarios.borrarPersonaExtra);
    server.post('/usuario/modificar_persona_extra/:id', usuarios.modificarPersonaExtra);
    server.del('/usuario/:id', usuarios.destroy);

};

