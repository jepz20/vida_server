'use strict';

var donaciones = require('../controllers/donaciones');
//Categorias routes use categorias controller
//var authorization = require('./middlewares/authorization');

// // Categorias authorization helpers
// var hasAuthorization = function(req, res, next) {
//  if (req.categoria.user.id !== req.user.id) {
//      return res.send(401, 'User is not authorized');
//  }
//     next();
// };

module.exports = function(server) {

    server.get('/donacion', donaciones.all);
    server.post('/donacion', donaciones.create);
    server.post('/donacion/cancelar_donacion/:id', donaciones.cancelarDonacion);
    server.post('/donacion/atender_solicitud/:id', donaciones.atenderSolicitud);
    server.post('/donacion/confirmar_donacion/:id', donaciones.confirmarDonacion);
    server.get('/donacion/:id', donaciones.show);
    server.put('/donacion/:id', donaciones.update);

};

