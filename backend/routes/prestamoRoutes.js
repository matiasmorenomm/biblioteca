'use strict'

const express = require('express');
const prestamoController = require('../controllers/prestamoController');
const prestamoMiddleware = require('../middlewares/prestamoMiddleware');

var routes = express.Router();

routes.post('/prestamo', prestamoMiddleware.validarDatos, prestamoController.registrarPrestamo);
routes.put('/prestamo/:id', prestamoController.devolucion);


module.exports = routes;