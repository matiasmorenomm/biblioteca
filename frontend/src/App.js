import React from 'react';
import './App.css';
import Login from './views/usuarios/login';
import Registro from './views/usuarios/registro';
import Checkout from './views/Checkout';
import Inicio from './views/Inicio';
import Prestamo from './views/Checkout';
import Libro from './views/libros/NuevoLibro';
import Libros from './views/libros/Libros';
import Alumno from './views/alumnos/NuevoAlumno';
import Alumnos from './views/alumnos/Alumnos';
import Prestamos from './views/prestamos/Prestamos';
import EditarAlumno from './views/alumnos/EditarAlumno';
import EditarLibro from './views/libros/EditarLibro';
import Reporte from './views/prestamos/Reporte';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import Auth from './auth';

function App() {
  return (
    <Router>
    <Switch>
      <Route path="/" exact>
        <Login />
      </Route>
      <Route path="/home" component={props => <Auth {...props} Component={Inicio} />} />
      <Route path="/libro/:codigo" component={props => <Auth {...props} Component={EditarLibro} />} />
      <Route path="/libro" exact component={props => <Auth {...props} Component={Libro} />} />
      <Route path="/libros" exact component={props => <Auth {...props} Component={Libros} />} />
      <Route path="/alumno/:rut" component={props => <Auth {...props} Component={EditarAlumno} />} />
      <Route path="/alumno" exact component={props => <Auth {...props} Component={Alumno} />} />
      <Route path="/alumnos" exact component={props => <Auth {...props} Component={Alumnos} />} />
      <Route path="/registro">
        <Registro />
      </Route>
      <Route path="/prestamo" exact component={props => <Auth {...props} Component={Prestamo} />} />
      <Route path="/prestamos" exact component={props => <Auth {...props} Component={Prestamos} />} />
      <Route path="/checkout" exact component={props => <Auth {...props} Component={Checkout} />} />
      <Route path="/reporte" exact component={props => <Auth {...props} Component={Reporte} />} />
      </Switch>
  </Router>
  );
}

export default App;
