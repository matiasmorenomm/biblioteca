'use strict'
var Prestamo = require('../models/prestamoModel');
var Alumno = require('../models/alumnoModel');
var Libro = require('../models/libroModel');

function registrarPrestamo(req, res) {
  let prestamo = new Prestamo();

  prestamo.libros = req.body.libro;
  prestamo.alumno = req.body.alumno;
  prestamo.fecha_programada = req.body.fecha_programada

  /* Validar si existe el libro */
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
        if (err || !PrestamoUpdated) {
          return res.status(400).send({
            mensaje: 'No se ha podido realizar la devolucion'
          });
        } else {
          return res.status(200).send({
            mensaje: 'La devolucion se ha registrado correctamente',
            prestamo: PrestamoUpdated
          });
        }
      })
    }
  })
}

function busqueda(req, res) {
  let rut = req.body.rut;
  let codigo = req.body.codigo;

  /* Busqueda por rut y codigo */
  if (rut && codigo) {
    Alumno.findOne({
      rut: rut
    }).exec((err, alumno) => {

      if (err || !alumno) {
        return res.status(400).send({
          mensaje: 'El rut ingresado no se encuentra registado en nuestro sistema'
        })

      } else {

        Libro.findOne({
          codigo: codigo
        }).exec((err, libro) => {
          if (err || !libro) {
            return res.status(400).send({
              mensaje: 'El codigo del libro no se encuentra registrado en el sistema'
            })
          } else {
            Prestamo.find({
              fecha_devolucion: null,
              libro: libro._id,
              alumno: alumno._id
            }).populate('libros').populate('alumno').exec((err, prestamos) => {

              if (err || !prestamos) {
                return res.status(400).send({
                  mensaje: 'No hemos podido realizar la busqueda'
                })

              } else {

                return res.status(200).send({
                  prestamos: prestamos
                })
              }
            })
          }
        })

      }
    })


  } else {
    /* Busqueda por rut */
    if (rut) {
      Alumno.findOne({
        rut: rut
      }).exec((err, alumno) => {

        if (err || !alumno) {
          return res.status(400).send({
            mensaje: 'El rut ingresado no se encuentra registado en nuestro sistema'
          })

        } else {

          Prestamo.find({
            fecha_devolucion: null,
            alumno: alumno._id
          }).populate('libros').populate('alumno').exec((err, prestamos) => {

            if (err || !prestamos) {
              return res.status(400).send({
                mensaje: 'No hemos podido relaizar la busqueda'
              })

            } else {

              return res.status(200).send({
                prestamos: prestamos
              })
            }
          })
        }
      })
    } else {
      /* busqueda por codigo */
      Libro.findOne({
        codigo: codigo
      }).exec((err, libro) => {
        if (err || !libro) {
          return res.status(400).send({
            mensaje: 'El codigo del libro no se encuentra registrado en el sistema'
          })
        } else {
          Prestamo.find({
            fecha_devolucion: null,
            libro: libro._id
          }).populate('libros').populate('alumno').exec((err, prestamos) => {

            if (err || !prestamos) {
              return res.status(400).send({
                mensaje: 'No hemos podido relaizar la busqueda'
              })

            } else {

              return res.status(200).send({
                prestamos: prestamos
              })
            }
          })
        }
      })
    }
  }
}

function reporteLibros(req, res) {
  Libro.find({
    titulo: req.body.titulo
  }).exec((err, libros) => {
    if (err || !libros) {
      return res.status(400).send({
        mensaje: 'Eror al consultar en el sistema'
      })
    } else {

      if (libros.length == 0) {
        return res.status(400).send({
          mensaje: 'El titulo del libro no se encuentra registrado en el sistema'
        })
      }

      var cont = 0;
      libros.forEach((libro) => {
        Prestamo.findOne({
          libro: libro._id,
          fecha_devolucion: null
        }).exec((err, prestamo) => {
          if (prestamo) {
            cont++;
          } else {
            cont = cont;
          }
        })
      })
      var disponibles = libros.length - cont;
      return res.status(200).send({
        disponibles: disponibles
      })
    }
  })
}

function prestamosA(req, res) {

  Prestamo.find({
    fecha_devolucion: null,
  }).populate('alumno').populate('libros').exec((err, prestamos) => {
    if (err || !prestamos) {
      return res.status(400).send({
        mensaje: 'No existen prestamos'
      })
    } else {
      return res.status(200).send({
        prestamos: prestamos
      })
    }
  })
}

function prestamos(req, res) {

  Prestamo.find().populate('libro').populate('alumno').exec((err, prestamos) => {
    if (err || !prestamos) {
      return res.status(400).send({
        mensaje: 'No existen prestamos'
      })
    } else {
      return res.status(200).send({
        prestamos: prestamos
      })
    }
  })
}



module.exports = {
  registrarPrestamo,
  busqueda,
  devolucion,
  prestamos,
  prestamosA,
  reporteLibros
}