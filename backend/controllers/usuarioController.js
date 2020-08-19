'use strict'

var Usuario = require('../models/usuarioModel');
const bcrypt = require('bcrypt-nodejs');
const jwt = require('jsonwebtoken');
var nodemailer = require('nodemailer');

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
          correo(usuarioStore);
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

function correo(usuario){
  var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'biblio1701@gmail.com',
      pass: 'pmftzqdhgsatcchk'
    }
  });

  var mensaje = `<h1>Bienvenido</h1>
                 <h3> Tu cuenta ha sido creada de forma exitosa tus credenciales son: </h3>
                 <br>
                 <b> Correo: </b> ${usuario.email}  
                 <br>
                 <b> Nombre: </b> ${usuario.nombre} 
                 <br>
                 <b> Apellidp: </b> ${usuario.apellido} ` ;

  var mailOptions = {
    from: 'biblio1701@gmail.com',
    to: usuario.email,
    subject: 'Credenciales Sistema de Biblioteca',
    html: mensaje
  };

  transporter.sendMail(mailOptions, function(error, info){
    if (error) {
      console.log(error);
    } else {
      console.log('Email enviado: ' + info.response);
    }
  });
}

module.exports = {
  guardar,
  login
}