'use strict'

const express = require('express');
const libroController = require('../controllers/libroController');
const libroMiddleware = require('../middlewares/libroMiddleware');

var routes = express.Router();

routes.post('/libro', libroMiddleware.validarDatos, libroController.guardar);
routes.get('/libro/:codigo', libroController.libro);
routes.put('/libro/:codigo', libroController.actualizar);
routes.delete('/libro/:codigo', libroController.eliminar);

module.exports = routes;