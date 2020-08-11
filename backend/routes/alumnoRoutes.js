'use strict'

const express = require('express');

const alumnoController = require('../controllers/alumnoController');
const alumnoMiddleware = require('../middlewares/alumnoMiddleware');

const routes = express.Router();

routes.post('/alumno', alumnoMiddleware.validarDatos, alumnoController.guardar);
routes.get('/alumno/:rut', alumnoController.alumno);
routes.put('/alumno/:rut', alumnoController.actualizar);
routes.delete('/alumno/:rut', alumnoController.eliminar);

module.exports = routes;