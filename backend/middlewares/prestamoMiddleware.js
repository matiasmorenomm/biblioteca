'use strict'

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

module.exports = {
  validarDatos
}