const mongoose = require('mongoose')
const bcrypt = require('bcrypt-nodejs')
const Schema = mongoose.Schema
const UsuarioSchema = new Schema({
  nombre: String,
  apellido: String,
  email: {type: String, unique:true},
  pass: String,
})

UsuarioSchema.pre('save', function (next) {
  const usuario = this;
  if (!usuario.isModified('pass')) {
    return next();
  }

  bcrypt.genSalt(10, (err, salt) => {
    if (err) {
      next(err);
    }
    bcrypt.hash(usuario.pass, salt, null, (err, hash) => {
      if (err) {
        next(err)
      }
      usuario.pass = hash;
      next();
    })
  });
})

module.exports = mongoose.model('Usuario', UsuarioSchema)