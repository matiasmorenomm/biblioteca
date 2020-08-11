'use strict'
var Prestamo = require('../models/prestamoModel');
var Alumno = require('../models/alumnoModel');
var Libro = require('../models/libroModel');

function registrarPrestamo(req, res) {
  let prestamo = new Prestamo();

  prestamo.libro = req.body.libro;
  prestamo.alumno = req.body.alumno;
  prestamo.fecha_programada = req.body.fecha_programada

  /* Validar si existe el libro */
  Libro.findOne({
    _id: prestamo.libro
  }).exec((err, lib) => {
    if (err || !lib) {
      return res.status(400).send({
        mensaje: 'El libro no existe'
      })
    } else {
      /* Validar si existe el alumno */
      Alumno.findOne({
        _id: prestamo.alumno
      }).exec((err, alum) => {
        if (err || !alum) {
          return res.status(400).send({
            mensaje: 'El alumno no existe'
          })
        } else {
          /* Registrar el prestamo */
          prestamo.save((err, prestamoStore) => {
            if (err || !prestamoStore) {
              return res.status(400).send({
                mensaje: 'El prestamo no se pudo registrar'
              })
            } else {
              return res.status(200).send({
                mensaje: 'El prestamo se registro de forma exitosa',
                prestamo: prestamoStore
              })
            }
          })
        }
      })
    }
  })
}

function devolucion(req, res) {
  let id = req.params.id;

  Prestamo.findOne({
    _id: id
  }).exec((err, prestamo) => {
    if (err || !prestamo) {
      return res.status(400).send({
        mensaje: 'El prestamo ingresado no existe'
      })
    } else {
      prestamo.fecha_devolucion = new Date();

      Prestamo.updateOne({
        _id: id
      }, prestamo, {
        new: true
      }, (err, PrestamoUpdated) => {
        if(err || !PrestamoUpdated) {
          return res.status(400).send({
            mensaje: 'No se ha podido realizar la devolucion'
          });
        }else{
          return res.status(200).send({
            mensaje: 'La devolucion se ha registrado correctamente',
            prestamo: PrestamoUpdated
          });
        }
      })
    }
  })
}

module.exports = {
  registrarPrestamo,
  devolucion
}