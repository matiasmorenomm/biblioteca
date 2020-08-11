'use strict'

var Libro = require('../models/libroModel');

function guardar(req, res) {
  let libro = new Libro();

  libro.titulo = req.body.titulo,
    libro.codigo = req.body.codigo,
    libro.autor = req.body.autor,
    libro.idioma = req.body.idioma

  Libro.findOne({
    codigo: libro.codigo
  }).exec((err, lib) => {
    if (lib) {
      return res.status(400).send({
        mensaje: 'Ya se encuentra este codigo registrado'
      });
    } else {
      libro.save((err, libroStore) => {
        if (err || !libroStore) {
          return res.status(400).send({
            mensaje: 'El libro no se pudo registrar'
          })
        } else {
          return res.status(200).send({
            mensaje: 'El libro se registro de froma exitosa',
            libro: libroStore
          })
        }
      })
    }
  })
}

function libro(req, res) {
  let codigo = req.params.codigo

  Libro.findOne({
    codigo: codigo
  }).exec((err, lib) => {
    if (err || !lib) {
      return res.status(400).send({
        mensaje: 'No existe un libro con este codigo'
      })
    } else {
      return res.status(200).send({
        libro: libro
      })
    }
  })
}

function actualizar(req, res) {
  let codigo = req.params.codigo;

  Libro.findOne({
    codigo: codigo
  }).exec((err, libro) => {
    if (err || !libro) {
      return res.status(400).send({
        mensaje: 'No se encuentra un libro con este codigo'
      })
    } else {
      var actualizar = {
        titulo: req.body.titulo,
        codigo: req.body.codigo,
        autor: req.body.autor,
        idioma: req.body.idioma
      }

      Libro.updateOne({
        codigo: codigo
      }, actualizar, {
        new: true
      }, (err, Libroupdated) => {
        if (err || !Libroupdated) {
          return res.status(400).send({
            mensaje: 'No se pudo actualizar el libro'
          })
        } else {
          return res.status(200).send({
            mensaje: 'Los datos del libro se actualizaron correctamente',
            libro: Libroupdated
          })
        }

      })
    }
  })
}

function eliminar(req, res) {
  let codigo = req.params.codigo

  Libro.findOne({
    codigo: codigo
  }).exec((err, lib) => {
    if (err || !lib) {
      return res.status(400).send({
        mensaje: 'No existe un libro con este codigo'
      })
    } else {
      Libro.deleteOne({
        codigo: codigo
      }, (err, LibroDeleted) => {
        if (err || !LibroDeleted) {
          return res.status(400).send({
            mensaje: 'No se ha podido eliminar el libro'
          })
        } else {
          return res.status(200).send({
            mensaje: 'El libro se elimino de forma exitosa'
          })
        }
      })
    }
  })
}

module.exports = {
  guardar,
  libro,
  actualizar,
  eliminar
}