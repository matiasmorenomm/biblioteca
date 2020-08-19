'use strict'

const express = require('express');
const prestamoController = require('../controllers/prestamoController');
const prestamoMiddleware = require('../middlewares/prestamoMiddleware');
var auth = require('../middlewares/auth');

var routes = express.Router();

routes.post('/prestamo', auth.isAuth ,prestamoMiddleware.validarDatos, prestamoController.registrarPrestamo);
routes.put('/prestamo/:id', auth.isAuth ,prestamoController.devolucion);
routes.get('/prestamos', auth.isAuth ,prestamoController.prestamos);
routes.get('/prestamosA', auth.isAuth ,prestamoController.prestamosA);
routes.post('/busqueda', auth.isAuth ,prestamoMiddleware.validarBusqueda, prestamoController.busqueda);
routes.post('/reportes', auth.isAuth ,prestamoMiddleware.validarReporte, prestamoController.reporteLibros);


module.exports = routes;