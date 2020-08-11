'use strict'


const express = require('express');

var bodyParser = require('body-parser')

const app = express()

var mongoose = require('mongoose')

var cors = require('cors')

app.use(bodyParser.urlencoded({
  extended: false
}))

app.use(bodyParser.json())

var auth = require('./middlewares/auth');

const libroRoutes = require('./routes/libroRoutes');
const alumnoRoutes = require('./routes/alumnoRoutes');
const prestamoRoutes = require('./routes/prestamoRoutes');
const usuarioRoutes = require('./routes/usuarioRoutes');

app.use('/libros-api', cors(), auth.isAuth, libroRoutes);
app.use('/alumnos-api', cors(), auth.isAuth, alumnoRoutes);
app.use('/prestamos-api', cors(), auth.isAuth, prestamoRoutes);
app.use('/api', cors(), prestamoRoutes);

mongoose.connect('mongodb://localhost:27017/biblioteca', {
  useNewUrlParser: true
}, (err, res) => {
  if (err) {
    console.log(err)
    process.exit()
  }
  app.listen(5000, () => {
    console.log('Api cargada en el puerto: 5000...')
  })
})