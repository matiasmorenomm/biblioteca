'use strict'

function validarDatos(req, res, next) {
  if (!req.body.nombre) {
    return res.status(403).send({
      mensaje: 'No viene declarado el nombre'
    })
  }

  if (!req.body.rut) {
    return res.status(403).send({
      mensaje: 'No viene declarado el rut'
    })
  }

  next();
}

module.exports = {
  validarDatos
}