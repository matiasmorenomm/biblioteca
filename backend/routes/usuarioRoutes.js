'use strict'

const express = require('express');
const usuarioController = require('../controllers/usuarioController');
var routes = express.Router();

var auth = require('../middlewares/auth');

routes.post('/usuario', auth.isAuth, usuarioController.guardar);
routes.post('/login', usuarioController.login);


module.exports = routes;