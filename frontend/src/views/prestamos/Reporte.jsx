import React, { useState } from "react";
import axios from 'axios';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '../layouts/AppBar';
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
    if(!data.titulo){
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Para buscar un reporte debe ingregar un titulo',
      })
    }else{
      axios
      .post("http://127.0.0.1:5000/prestamos-api/reportes", data)
      .then(
        response => {
          if(response.status === 200) {
            setItem(response.data.disponibles);
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

  const [item, setItem] = useState(0);

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
        <Grid item xs={12} sm={8}>
          <TextField
            variant="outlined"
            required
            fullWidth
            id="titulo"
            label="Titulo del libro"
            name="titulo"
            autoComplete="lname"
            inputRef= {register}
              />
        </Grid>
        <Button type="submit" variant="outlined" color="primary">
          Buscar Reporte
        </Button>
      </Grid>
      </form>
      </Container>
      <Container className={classes.container}>
      <Grid>
      <Typography variant="h6" gutterBottom>
        Libros Disponibles:
      </Typography>
      <TextField value={item}></TextField>
      </Grid>
      
      </Container>
    </React.Fragment>
    
  );
}