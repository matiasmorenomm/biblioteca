import React, { useState, useEffect }  from 'react';
import Grid from '@material-ui/core/Grid'
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import axios from 'axios';
import { useForm } from "react-hook-form";
import Swal from 'sweetalert2';
import TableBody from '@material-ui/core/TableBody';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Container from '@material-ui/core/Container';

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
  container: {
    marginTop: 30,
  }
});


export default function Buscaralumno(){

  const { register, handleSubmit } = useForm();

  const [item, setItem] = useState([]);
  const [seleccion, setSeleccion] = useState([]);

  const onSubmit = data => {
    if(!data.rut && !data.nombre){
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Para buscar un alumno debe ingresar el rut o el nombre',
      })
    }else{
      axios
      .post("http://127.0.0.1:5000/alumnos-api/busqueda", data)
      .then(
        response => {
          if(response.status === 200) {
            setItem(response.data.alumno);
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


  const sele = (parameter) => (event) => {

    let arrr = [];
    arrr.push(parameter);

    setSeleccion(arrr);
    localStorage.setItem('alumno_prestamo', JSON.stringify(arrr));

    return null;
}

  const classes = useStyles();
  return (
    
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        Buscador Libro
      </Typography>
      <form onSubmit={handleSubmit(onSubmit)} noValidate>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={5}>
          <TextField
            variant="outlined"
            required
            fullWidth
            id="rut"
            label="Rut"
            name="rut"
            autoComplete="lname"
            inputRef= {register}
              />
        </Grid>
        <Grid item xs={12} sm={5}>
          <TextField
            variant="outlined"
            required
            fullWidth
            id="nombre"
            label="Nombre"
            name="nombre"
            autoComplete="lname"
            inputRef= {register}
              />
        </Grid>
        <Button type="submit" variant="outlined" color="primary">
          Buscar Alumno
        </Button>
      </Grid>
      </form>

      <Container className={classes.container}>
      <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell  component="th">Rut</TableCell>
            <TableCell >Nombre</TableCell>
            <TableCell > Seleccionar </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {item.map((item) => (
            
            <TableRow key={item.codigo}>
              <TableCell >{item.rut}</TableCell>
              <TableCell >{item.nombre}</TableCell>
              <TableCell > 
                <Button variant="outlined" color="danger" onClick={sele(item)}>
                  Seleccionar
                </Button> 
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
   
      </Container>

      <Container className={classes.container}>
      <Typography variant="h6" gutterBottom>
        Libros seleccionados
      </Typography>
      <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell align="left" component="th">Rut</TableCell>
            <TableCell align="left">Nombre</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {seleccion.map((sele, index) => (
            
            <TableRow>
              <TableCell align="left">{sele.rut}</TableCell>
              <TableCell align="left">{sele.nombre}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      </TableContainer>
      </Container>
     </React.Fragment>
  );
}

