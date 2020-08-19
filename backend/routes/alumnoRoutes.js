'use strict'

const express = require('express');

const alumnoController = require('../controllers/alumnoController');
const alumnoMiddleware = require('../middlewares/alumnoMiddleware');
const auth = require('../middlewares/auth');

const routes = express.Router();

routes.post('/alumno', auth.isAuth ,alumnoMiddleware.validarDatos, alumnoController.guardar);
routes.get('/alumno/:rut', auth.isAuth ,alumnoController.alumno);
routes.get('/alumnos', auth.isAuth ,alumnoController.alumnos);
routes.put('/alumno/:rut', auth.isAuth ,alumnoController.actualizar);
routes.delete('/alumno/:rut', auth.isAuth ,alumnoController.eliminar);
routes.post('/busqueda', auth.isAuth ,alumnoController.busqueda);

module.exports = routes;