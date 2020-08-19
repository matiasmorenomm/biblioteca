import React, { useState, useEffect } from "react";
import axios from 'axios';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '../layouts/AppBar';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Container from '@material-ui/core/Container';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Swal from 'sweetalert2';
import { useForm } from "react-hook-form";
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';


const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
  container: {
    marginTop: 30,
  }
});

export default function Prestamos() {

  const { register, handleSubmit } = useForm();

  const onSubmit = data => {
    if(!data.rut && !data.codigo){
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Para buscar un libro debe ingresar el codigo o el titulo',
      })
    }else{
      axios
      .post("http://127.0.0.1:5000/prestamos-api/busqueda", data)
      .then(
        response => {
          if(response.status === 200) {
            setItem(response.data.prestamos);
            console.log(response.data.prestamos)
            return null;
          }else{
            Swal.fire({
              icon: 'error',
              title: 'Oops...',
              text: response.data.mensaje,
            })
          }
        }
      )
      .catch((error) => {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: error.response.data.mensaje,
        })
      })
    }
  }

  const [item, setItem] = useState([]);
  
  useEffect(() => {
    cargar();
  }, []);

  const cargar = async() =>{
    const { data } = await axios.get("http://127.0.0.1:5000/prestamos-api/prestamosA");
    /* setItem es la funcion asignada para cambiar el valor de item */
    setItem(data.prestamos);
    console.log(data.prestamos)
    return null;
  }

  const devol = (parameter => (event) => {
    axios
    .put("http://127.0.0.1:5000/prestamos-api/prestamo/"+parameter)
    .then(
      response => {
        if(response.status === 200) {
          cargar();
          Swal.fire({
            icon: 'success',
            title: 'Exito...',
            text: response.mensaje,
          })
        }else{
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: response.data.mensaje,
          })
        }
      }
    )
    .catch((error) => {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: error.response.data.mensaje,
      })
    })
  });

  const classes = useStyles();
  
  return (
    <React.Fragment>
      <CssBaseline />
      <AppBar></AppBar>
      <Container>
      <Typography variant="h6" gutterBottom>
        Buscador Prestamo
      </Typography>
      <form onSubmit={handleSubmit(onSubmit)} noValidate>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={5}>
          <TextField
            variant="outlined"
            required
            fullWidth
            id="codigo"
            label="Codigo del Libro"
            name="codigo"
            autoComplete="lname"
            inputRef= {register}
              />
        </Grid>
        <Grid item xs={12} sm={5}>
          <TextField
            variant="outlined"
            required
            fullWidth
            id="rut"
            label="Rut del alumno"
            name="rut"
            autoComplete="lname"
            inputRef= {register}
              />
        </Grid>
        <Button type="submit" variant="outlined" color="primary">
          Buscar Libro
        </Button>
      </Grid>
      </form>
      </Container>
      <Container className={classes.container}>
      <Typography variant="h6" gutterBottom>
        Prestamos Activos
      </Typography>
      <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell align="left" component="th">Alumno</TableCell>
            <TableCell align="left">Rut</TableCell>
            <TableCell align="left">Libro</TableCell>
            <TableCell align="left">Fecha Prestamo</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {item.map((sele, index) => (
            
            <TableRow>
              <TableCell align="left">{sele.alumno.nombre}</TableCell>
              <TableCell align="left">{sele.alumno.rut}</TableCell>
              <TableCell align="left">{sele.libro.titulo}</TableCell>
              <TableCell align="left">{sele.fecha}</TableCell>
              <TableCell align="left">{sele.fecha_programada}</TableCell>
              <TableCell align="left">
                <Button variant="outlined" color="primary" onClick={devol(sele._id)} >
                  Devolucion
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      </TableContainer>
      </Container>
    </React.Fragment>
    
  );
}