'use strict'

const express = require('express');
const libroController = require('../controllers/libroController');
const libroMiddleware = require('../middlewares/libroMiddleware');
const auth = require('../middlewares/auth');

var routes = express.Router();

routes.post('/libro', auth.isAuth ,libroMiddleware.validarDatos, libroController.guardar);
routes.get('/libro/:codigo', auth.isAuth ,libroController.libro);
routes.post('/busqueda', auth.isAuth ,libroController.busqueda);
routes.get('/libros', auth.isAuth ,libroController.libros);
routes.put('/libro/:codigo', auth.isAuth ,libroController.actualizar);
routes.delete('/libro/:codigo', auth.isAuth ,libroController.eliminar);

module.exports = routes;