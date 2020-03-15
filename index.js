'use strict'

//conexion a la base de datos
var mongoose = require('mongoose');

//conexion al servidor
var app = require('./app');
var port = 3700;

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/portafolio').then(res => {
    console.log('conexion establecida');

    // creamos el servidor
    app.listen(port, () => {
        console.log('corriendo el servidor');
    });
})
.catch(error => {
    console.log('error: ',error);
});