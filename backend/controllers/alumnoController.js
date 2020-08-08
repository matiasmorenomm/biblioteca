'use strict'
const Alumno = require('../models/alumnoModel');

function guardar(req, res) {
  let alumno = new Alumno();

  alumno.nombre = req.body.nombre;
  alumno.rut = req.body.rut;

  Alumno.findOne({
    rut: alumno.rut
  }).exec((err, alum) => {
    if (alum) {
      return res.status(400).send({
        mensaje: 'El rut ingresado ya se encuentra en el sistema'
      });
    } else {
      alumno.save((err, alumnoStore) => {
        if (err || !alumnoStore) {
          return res.status(400).send({
            mensaje: 'El alumno no se pudo registrar'
          })
        } else {
          return res.status(200).send({
            mensaje: 'El alumno se registro de forma exitosa',
            alumno: alumnoStore
          })
        }
      })
    }
  })
}

function alumno(req, res) {
  let rut = req.params.rut

  Alumno.findOne({
    rut: rut
  }).exec((err, alumno) => {
    if (err || !alumno) {
      return res.status(400).send({
        mensaje: 'No se encuentra un alumno con el rut ingresado'
      })
    } else {
      return res.status(200).send({
        alumno: alumno
      })
    }
  })
}

function actualizar(req, res) {
  let rut = req.params.rut

  Alumno.findOne({
    rut: rut
  }).exec((err, alumno) => {
    if (err || !alumno) {
      return res.status(400).send({
        mensaje: 'No se encuentra un alumno con el rut ingresado'
      })
    } else {
      var actualizar = {
        nombre: req.body.nombre,
        rut: req.body.rut
      }

      Alumno.updateOne({
        rut: rut
      }, actualizar, {
        new: true
      }, (err, AlumnoUpdated) => {
        if (err || !AlumnoUpdated) {
          return res.status(400).send({
            mensaje: 'No se pudo actualuizar el alumno'
          })
        } else {
          return res.status(200).send({
            mensaje: 'Los datos del alumno se actualizaron correctamente',
            alumno: AlumnoUpdated
          })
        }
      })
    }
  })
}

function eliminar(req, res) {
  let rut = req.params.rut

  Alumno.findOne({
    rut: rut
  }).exec((err, alumno) => {
    if (err || !alumno) {
      return res.status(400).send({
        mensaje: 'No se encuentra un alumno con el rut ingresado'
      })
    } else {
      Alumno.deleteOne({
        rut: rut
      }, (err, AlumnoDeleted) => {
        if (err || AlumnoDeleted) {
          return res.status(400).send({
            mensaje: 'El alumno no se pudo eliminar',
          })
        }else{
          return res.staus(200).send({
            mensaje: 'El alumno se elimino de forma correcta'
          })
        }
      })
    }
  });
}

module.exports = {
  eliminar,
  actualizar,
  alumno,
  guardar
}