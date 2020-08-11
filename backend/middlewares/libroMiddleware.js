'use strict'

function validarDatos(req, res, next) {
  if (!req.body.titulo) {
    return res.status(403).send({
      mensaje: 'No viene declarado el titulo'
    })
  }

  if (!req.body.codigo) {
    return res.status(403).send({
      mensaje: 'No viene declarado el codigo'
    })
  }

  if (!req.body.autor) {
    return res.status(403).send({
      mensaje: 'No viene declarado el autor'
    })
  }

  if (!req.body.idioma) {
    return res.status(403).send({
      mensaje: 'No viene declarado el idioma'
    })
  }

  next();
}

module.exports = {
  validarDatos
}