const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var PrestamoSchema = new Schema({
  libro: {type: Schema.ObjectId, ref: 'Libro'},
  alumno: {type: Schema.ObjectId, ref: 'Alumno'},
  fecha: {type: Date, default: Date.now},
  fecha_programada: Date,
  fecha_devolucion: Date
})

module.exports = mongoose.model('Prestamo', PrestamoSchema);