'use strict'

var Usuario = require('../models/usuarioModel');
const bcrypt = require('bcrypt-nodejs');
const jwt = require('jsonwebtoken');

function guardar(req, res) {
  let usuario = new Usuario()

  usuario.nombre = req.body.nombre
  usuario.apellido = req.body.apellido
  usuario.email = req.body.email
  usuario.pass = req.body.pass

  Usuario.findOne({
    email: usuario.email
  }).exec((err, ema) => {
    if (err || ema) {
      return res.status(400).send({
        mensaje: 'Este email ya se encuentra registrado'
      })
    } else {
      usuario.save((err, usuarioStore) => {
        if (err || !usuarioStore) {
          return res.status(500).send({
            mensaje: 'El usuario no se ha podido registrar'
          })
        } else {
          return res.status(200).send({
            mensaje: 'El usuario se ha registrado de forma exitosa',
            usuario: usuarioStore
          })
        }
      })
    }
  })
}

function login(req, res) {
  let email = req.body.email
  let pass = req.body.pass

  Usuario.findOne({
    email: email
  }).exec((err, usuario) => {
    if (err || !usuario) {
      return res.status(400).send({
        mensaje: 'El usuario no existe'
      })
    } else {
      bcrypt.compare(pass, usuario.pass, function (err, result) {
        if (result) {
          var token = jwt.sign({
            usuario
          }, 'clavesecreta');
          return res.status(200).send({
            token: token
          })
        } else {
          return res.status(404).send({
            mensaje: 'La contraseña no es correcta'
          })
        }
      })
    }


  })
}

module.exports = {
  guardar,
  login
}