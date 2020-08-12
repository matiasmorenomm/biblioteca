'use strict'

var Alumno = require('../models/alumnoModel');
var Libro = require('../models/libroModel');

function validarDatos(req, res, next) {

  if (!req.body.libro) {
    return res.status(403).send({
      mensaje: 'no viene declarado el libro'
    })
  }

  if (!req.body.alumno) {
    return res.status(403).send({
      mensaje: 'no viene declarado el alumno'
    })
  }

  if (!req.body.fecha_programada) {
    return res.status(403).send({
      mensaje: 'no viene declarado la fecha programada de entrega'
    })
  }

  next()
}

function validarBusqueda(req, res, next) {

  if (!req.body.codigo && !req.body.rut) {
    return res.status(400).send({
      mensaje: 'Debe ingresar el rut del alumno o el codigo del libro para realizar la busqueda'
    })
  }
  next();
}

function validarReporte(req, res, next) {

  if (!req.body.titulo) {
    return res.status(400).send({
      mensaje: 'Debe ingresar el titulo del libro'
    })
  }
  next();
}


module.exports = {
  validarDatos,
  validarBusqueda,
  validarReporte
}