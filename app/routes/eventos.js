'use strict';

var eventos = require('../controllers/eventos')
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

    server.get('/evento', eventos.all);
    server.post('/evento', eventos.create);
    server.get('/evento/:id', eventos.show);
    server.put('/evento/:id', eventos.update);
    server.post('/evento/cancelar_evento/:id', eventos.cancelarEvento);
    server.del('/evento/:id', eventos.destroy);

};

