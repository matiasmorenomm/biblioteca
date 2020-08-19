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
import PrestamosA from './views/prestamos/PrestamosA';
import EditarAlumno from './views/alumnos/EditarAlumno';
import EditarLibro from './views/libros/EditarLibro';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";

function App() {
  return (
    <Router>
    <Switch>
      <Route path="/" exact>
        <Login />
      </Route>
      <Route path="/home">
        <Inicio />
      </Route>
      <Route path="/libro/:codigo">
        <EditarLibro />
      </Route>
      <Route path="/libro" exact>
        <Libro />
      </Route>
      <Route path="/libros" exact>
        <Libros />
      </Route>
      <Route path="/alumno/:rut">
        <EditarAlumno />
      </Route>
      <Route path="/alumno" exact>
        <Alumno />
      </Route>
      <Route path="/alumnos" exact>
        <Alumnos />
      </Route>
      <Route path="/registro" exact>
        <Registro />
      </Route>
      <Route path="/prestamo" exact>
        <Prestamo />
      </Route>
      <Route path="/prestamos" exact>
        <Prestamos />
      </Route>
      <Route path="/prestamosA" exact>
        <PrestamosA />
      </Route>
      <Route path="/checkout" exact>
        <Checkout />
      </Route>
      </Switch>
  </Router>
  );
}

export default App;
