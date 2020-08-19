import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import BookIcon from '@material-ui/icons/Book';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import Swal from 'sweetalert2';
import AppBar from '../layouts/AppBar';


const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function LibroRegistro() {
  const { register, handleSubmit } = useForm();
  const onSubmit = data => {

    if(!data.titulo || !data.codigo || !data.autor || !data.idioma) {
      Swal.fire({
        icon: 'error',
        title: 'Opss...',
        text: 'Debe rellenar todo los campos'
      })
    }else{
      axios
    .post("http://127.0.0.1:5000/libros-api/libro",data)
    .then(
      response => {
        if(response.status === 200){
          Swal.fire({
            icon: 'success',
            title: 'Exito...',
            text: 'Se ha registrado de forma correcta'
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
    .catch((error)=> {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: error.response.data.mensaje,
      })
    })
    }
   
  } 
  const classes = useStyles();

  return (
    <React.Fragment>
    <CssBaseline />
      <AppBar></AppBar>
      <Container component="main" maxWidth="xs">
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <BookIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Nuevo libro
        </Typography>
        <form onSubmit={handleSubmit(onSubmit)} className={classes.form} noValidate>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                autoComplete
                name="titulo"
                variant="outlined"
                required
                fullWidth
                id="titulo"
                label="Titulo"
                autoFocus
                inputRef={register}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="codigo"
                label="Codigo"
                name="codigo"
                autoComplete
                inputRef={register}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="autor"
                label="Autor"
                id="autor"
                autoComplete
                inputRef={register}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="idioma"
                label="Idioma"
                id="idioma"
                autoComplete
                inputRef={register}
              />
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Registrar
          </Button>
        </form>
      </div>
    </Container>
    </React.Fragment>
    
  );
}