'use strict';

var lugares = require('../controllers/lugares');
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

    server.get('/lugar', lugares.all);
    server.post('/lugar', lugares.create);
    server.get('/lugar/:id', lugares.show);
    server.put('/lugar/:id', lugares.update);
    server.post('/lugar/cambiar_ubicacion/:id', lugares.cambiarUbicacion);
    server.del('/lugar/:id', lugares.destroy);

};

