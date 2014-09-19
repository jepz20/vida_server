'use strict';
/**
 * Inicializando variables
 */
var restify = require('restify')
    ,mongoose = require('mongoose')
    ,fs = require('fs')
    ,passport = require('passport');


//Se cargan las configuraciones dependiendo del ambiente
process.env.NODE_ENV = process.env.NODE_ENV || 'development';

//requiero la configuracion despues de definir el ambiente
var config = require('./config/config');
//inicio la conexion a mongo
mongoose.connect(config.db);


//Directorio para los modelos
var models_path = __dirname + '/app/models';
//Recorre todos los archivos de la caperta
//y los inicializa con  un require a los archivos
var walk = function(path) {
    fs.readdirSync(path).forEach(function(file) {
        var newPath = path + '/' + file;
        var stat = fs.statSync(newPath);
        if (stat.isFile()) {
            if (/(.*)\.(js$|coffee$)/.test(file)) {
                require(newPath);
            }
        } else if (stat.isDirectory()) {
            walk(newPath);
        }
    });
};
walk(models_path);

// cargo la config de passport
require('./config/passport')(passport);

var server = restify.createServer({ name : 'vida-api'});

// server.use(restify.acceptParser(server.acceptable));
server.use(restify.authorizationParser())
.use(restify.queryParser({ mapParams : false }))
.use(restify.bodyParser({ mapParams : false }))
.use(restify.fullResponse())
.use(passport.initialize());

//Directorio para las rutas
var routes_path = __dirname +'/app/routes';


var walk = function(path) {
    fs.readdirSync(path).forEach(function(file) {
        var newPath = path + '/' + file;
        var stat = fs.statSync(newPath);
        if (stat.isFile()) {
            if (/(.*)\.(js$|coffee$)/.test(file)) {
                require(newPath)(server,passport);
            }
        // We skip the app/routes/middlewares directory as it is meant to be
        // used and shared by routes as further middlewares and is not a
        // route by itself
        } else if (stat.isDirectory() && file !== 'middlewares') {
            walk(newPath);
        }
    });
};

walk(routes_path);

var port = process.env.PORT || '2222';
//Inicializo la aplicacion en el puerto 2222
server.listen(port,function() {
    console.log('%s listentig at %s',server.name,server.url);
});

// Inicializo los logs
//logger.init(server, mongoose);


// Expongo el server
exports = module.exports = server;

