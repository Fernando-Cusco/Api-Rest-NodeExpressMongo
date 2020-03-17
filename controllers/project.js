'use strict'
var Project = require('../models/project');
var fs = require('fs');
var path = require('path');
var controller = {
    home: function (req, res) {
        return res.status(200).send({
            mensaje: 'Soy el metodo home del controllador de project'
        });
    },
    test: function (req, res) {
        return res.status(200).send({
            mensaje: 'Soy el metodo test del controllador de project'
        });
    },
    save: function (req, res) {
        var project = new Project();
        var params = req.body;
        project.name = params.name;
        project.description = params.description;
        project.category = params.category;
        project.year = params.year;
        project.langs = params.langs;
        project.image = null;
        //guardamos en la base de datos
        project.save((err, projectSrored) => {
            if (err) return res.status(500).send({
                mensaje: 'error en guardar error 500'
            });
            if (!projectSrored) return res.status(404).send({
                mensaje: 'error en guardar error 400'
            });
            return res.status(200).send({
                project: project,
                mensaje: 'Proyecto guardado exitosamente '
            });
        });
    },
    getProject: function (req, res) {
        var projectId = req.params.id;
        if (projectId == null) {
            return res.status(404).send({
                mensaje: 'falta un parametro'
            });
        }
        Project.findById(projectId, (err, project) => {
            if (err) return res.status(500).send({
                mensaje: 'error en la busqueda del proyecto'
            });
            if (!project) return res.status(404).send({
                mensaje: 'proyecto no existe'
            });
            return res.status(200).send({
                project: project
            });
        });
    },
    allProjects: function (req, res) {
        //Project.find({year: 2019}) anio sea igual al 2019 es tipo un where de sql
        //Project.find({}).sort('-year') ordenamos mayor a menor
        //Project.find({}).sort('+year') ordenamos menor a mayor
        Project.find({}).sort('-year').exec((err, projects) => {
            if (err) return res.status(500).send({
                mensaje: 'error en la consulta'
            });
            if (!projects) return res.status(404).send({
                mensaje: 'No existen protectos'
            });
            return res.status(200).send({
                projects: projects
            });
        });
    },
    updateProject: function (req, res) {
        var projectId = req.params.id;
        var update = req.body;
        Project.findByIdAndUpdate(projectId, update, (err, projectUpdated) => {
            if (err) return res.status(500).send({
                mensaje: 'error al actualizar'
            });
            if (!projectUpdated) return res.status(404).send({
                mensaje: 'no existe le proyecto para actualizar'
            });
            return res.status(200).send({
                project: update,
                mensaje: 'Actualizacion exitosa'
            });
        });
    },
    deleteProject: function (req, res) {
        var projectId = req.params.id;
        Project.findByIdAndRemove(projectId, (err, projectRemove) => {
            if (err) return res.status(500).send({
                mensaje: 'error al eliminar project'
            });
            if (!projectRemove) return res.status(404).send({
                mensaje: 'no existe le proyecto para eliminar'
            });
            return res.status(200).send({
                project: projectRemove,
                mensaje: 'El proyecto se ha emilinado exitosamente'
            });
        });
    },
    uploadImage: function (req, res) {
        var projectId = req.params.id;
        var fileName = 'Imagen no subida';
        //subir imagen
        if (req.files) {
            var filePath = req.files.image.path;
            var fileSplit = filePath.split('/');
            fileName = fileSplit[1];
            var extSplit = fileName.split('\.');
            var extesionFile = extSplit[1];
            if (extesionFile == 'png' || extesionFile == 'jpg' || extesionFile == 'jpeg' || extesionFile == 'gif') {


                Project.findByIdAndUpdate(projectId, { image: fileName }, (err, projectUpdated) => {
                    if (err) return res.status(500).send({
                        mensaje: 'error al actualizar'
                    });
                    if (!projectUpdated) return res.status(404).send({
                        mensaje: 'no existe le proyecto para actualizar'
                    });
                    return res.status(200).send({
                        project: projectUpdated,
                        mensaje: 'Imagen actualizado con exito'
                    });
                });
            } else {
                //eliminar el archivo en el caso no sea una imagen con las extensiones correctas
                fs.unlink(filePath, (err) => {
                    return res.status(200).send({
                        mensaje: 'La extesion .' + extesionFile + ' no es valida.'
                    });
                });
            }
        } else {
            return res.status(200).send({
                mensaje: fileName
            });
        }
    },
    getImageFile: function(req, res) {
        var file = req.params.image;
        var path_file = './uploads/'+file;
        fs.exists(path_file, (exists) => {
            if(exists) {
                return res.sendFile(path.resolve(path_file));
            } else {
                return res.status(200).send({
                    mensaje: 'No existe la imagen'
                });
            }
        });
    }
};

module.exports = controller;