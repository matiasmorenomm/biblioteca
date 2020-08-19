'use strict'

function validarlogin (req, res, next) {
  if(!req.body.email) {
    return res.status(400).send({
      mensaje: 'El email no viene definido'
    })
  }

  if(!req.body.pass) {
    return res.status(400).send({
      mensaje: 'La contraseña no viene definida'
    })
  }

  next();
}

function validarRegistro(req, res, next){
  if(!req.body.nombre) {
    return res.status(400).send({
      mensaje: 'El nombre no se encuentra definido'
    })
  }

  if(!req.body.apellido) {
    return res.status(400).send({
      mensaje: 'El apellido no se encuentra definido'
    })
  }

  if(!req.body.email) {
    return res.status(400).send({
      mensaje: 'El email no se encuentra definido'
    })
  }
  if(!req.body.pass) {
    return res.status(400).send({
      mensaje: 'La contraseña no se encuentra definida'
    })
  }

  next();

}

module.exports = {
  validarRegistro,
  validarlogin
}