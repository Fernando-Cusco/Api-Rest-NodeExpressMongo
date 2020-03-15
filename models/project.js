'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;
//creamos el modelo
var ProjectSchema = Schema({
    name: String,
    description: String,
    category: String,
    year: Number,
    langs: String,
    image: String
});

//exportamos para poder usarla en otros archivos
module.exports = mongoose.model('Project', ProjectSchema);