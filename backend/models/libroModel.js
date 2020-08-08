const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var LibroSchema = new Schema({
  titulo: String,
  codigo: {type: String, unique:true},
  autor: String,
  idioma: String
})

module.exports = mongoose.model('Libro', LibroSchema);