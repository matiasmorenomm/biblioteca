import React, { useState }  from 'react';
import Grid from '@material-ui/core/Grid'
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Container from '@material-ui/core/Container';
import axios from 'axios';
import { useForm } from "react-hook-form";
import Swal from 'sweetalert2';

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
  container: {
    marginTop: 30,
  }
});

export default function BuscarLibro(){

  const { register, handleSubmit } = useForm();

  const [item, setItem] = useState([]);

  const [seleccion, setSeleccion] = useState([]);

  const onSubmit = data => {
    if(!data.titulo && !data.codigo){
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Para buscar un libro debe ingresar el codigo o el titulo',
      })
    }else{
      axios
      .post("http://127.0.0.1:5000/libros-api/busqueda", data)
      .then(
        response => {
          if(response.status === 200) {
            setItem(response.data.libro);
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

    arrr = seleccion.slice();

    arrr.push(parameter);

    setSeleccion(arrr);

    localStorage.setItem('libros_prestamo', JSON.stringify(arrr));

    return null;
}

const elim = (parameter) => (event) => {

  let arrr = [];

  arrr = seleccion.slice();

  arrr.splice(parameter, 1);

  setSeleccion(arrr);

  localStorage.setItem('libros_prestamo', JSON.stringify(arrr));

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
            id="titulo"
            label="Titulo"
            name="titulo"
            autoComplete="lname"
            inputRef= {register}
              />
        </Grid>
        <Button type="submit" variant="outlined" color="primary">
          Buscar Libro
        </Button>
      </Grid>
      </form>
      
      
      <Container className={classes.container}>
      <Typography variant="h6" gutterBottom>
        Libros
      </Typography>
      <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell align="left" component="th">Codigo</TableCell>
            <TableCell align="left">Titulo</TableCell>
            <TableCell align="left">Autor</TableCell>
            <TableCell align="left">Año</TableCell>
            <TableCell align="left">Selecionar</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {item.map((ite) => (
            
            <TableRow key={ite.codigo}>
              <TableCell align="left">{ite.codigo}</TableCell>
              <TableCell align="left">{ite.titulo}</TableCell>
              <TableCell align="left">{ite.autor}</TableCell>
              <TableCell align="left">{ite.ano}</TableCell>
              <TableCell align="left">
                <Button variant="outlined" color="primary" onClick={sele(ite)} >
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
            <TableCell align="left" component="th">Codigo</TableCell>
            <TableCell align="left">Titulo</TableCell>
            <TableCell align="left">Autor</TableCell>
            <TableCell align="left">Año</TableCell>
            <TableCell align="left">Selecionar</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {seleccion.map((sele, index) => (
            
            <TableRow>
              <TableCell align="left">{sele.codigo}</TableCell>
              <TableCell align="left">{sele.titulo}</TableCell>
              <TableCell align="left">{sele.autor}</TableCell>
              <TableCell align="left">{sele.ano}</TableCell>
              <TableCell align="left">
                <Button variant="outlined" color="secondary" onClick={elim(index)}>
                  Eliminar
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

