'use strict'

var express = require('express');
var ProjectController = require('../controllers/project');

var router = express.Router();


//middleware para subir imagenes
var multiPart = require('connect-multiparty');
//ruta donde se van subir las imagenes
var multiPartMiddleware = multiPart({uploadDir: './uploads'});

router.get('/home', ProjectController.home);

router.post('/test', ProjectController.test);

router.post('/save', ProjectController.save);

router.get('/project/:id?', ProjectController.getProject);

router.get('/projects', ProjectController.allProjects);

router.put('/project/:id', ProjectController.updateProject);

router.delete('/project/:id', ProjectController.deleteProject);

router.post('/upload-image/:id', multiPartMiddleware, ProjectController.uploadImage);

router.get('/get-image/:image', ProjectController.getImageFile);

module.exports = router;