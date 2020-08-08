const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var AlumnoSchema = new Schema({
  nombre: String,
  rut: {type: String, unique:true}
})

module.exports = mongoose.model('Alumno', AlumnoSchema);