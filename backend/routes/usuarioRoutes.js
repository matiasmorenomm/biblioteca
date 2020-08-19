'use strict'

const express = require('express');
const usuarioController = require('../controllers/usuarioController');
var routes = express.Router();

var auth = require('../middlewares/auth');
var usuarioMiddleware = require ('../middlewares/usuarioMiddleware');

routes.post('/usuario', usuarioMiddleware.validarRegistro ,usuarioController.guardar);
routes.post('/login', usuarioMiddleware.validarlogin ,usuarioController.login);


module.exports = routes;