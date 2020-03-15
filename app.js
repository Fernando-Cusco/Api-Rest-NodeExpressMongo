'use strict'

var express = require('express');
var bodyParser = require('body-parser');
var app = express();

//cargar archivos de rutas
var ProjectRoutes = require('./routes/project');

//configurar middlewares
//lo que llega por post se conviarte a json
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

//CORS
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
    next();
});
//rutas
app.use('/api', ProjectRoutes);

//exportar
module.exports = app;