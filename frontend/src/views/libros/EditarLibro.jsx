import React, {useEffect, useState} from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import PersonAddIcon from '@material-ui/icons/PersonAdd';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import Swal from 'sweetalert2';
import AppBar from '../layouts/AppBar';
import { useParams } from 'react-router-dom';

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://material-ui.com/">
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

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

export default function AlumnoActualizar() {

  const [item, setItem] = useState([]);

  const {codigo} = useParams();

  useEffect(() => {
    cargar();
  }, []);

  const cargar = async() =>{
    const { data } = await axios.get("http://127.0.0.1:5000/libros-api/libro/" + codigo);
    /* setItem es la funcion asignada para cambiar el valor de item */
    setItem(data.libro);
    return null;
  }
  const { register, handleSubmit } = useForm();
  const onSubmit = data => {

    axios
    .put("http://127.0.0.1:5000/libros-api/libro/" + codigo ,data)
    .then(
      response => {
        if(response.status === 200){
          cargar();
          Swal.fire({
            icon: 'success',
            title: 'Exito...',
            text: 'Se ha Actualizado de forma correcta'
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
  const classes = useStyles();

  return (
    <React.Fragment>
    <CssBaseline />
      <AppBar></AppBar>
      <Container component="main" maxWidth="xs">
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <PersonAddIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Actualizar Libro
        </Typography>
        <form onSubmit={handleSubmit(onSubmit)} className={classes.form} noValidate>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Typography>
                Autor:
              </Typography>
              <TextField
                autoComplete
                name="autor"
                variant="outlined"
                required
                defaultValue={item.autor}
                label={item.autor}
                fullWidth
                id="autor"
                autoFocus
                inputRef={register}
              />
            </Grid>
            <Grid item xs={12}>
              <Typography>
                Titulo:
              </Typography>
              <TextField
                autoComplete
                name="titulo"
                variant="outlined"
                required
                label={item.titulo}
                fullWidth
                defaulValue={item.titulo}
                id="titulo"
                autoFocus
                inputRef={register}
              />
            </Grid>
            <Grid item xs={12}>
              <Typography>
                Idioma:
              </Typography>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="idioma"
                name="idioma"
                readonly
                label={item.idioma}
                defaultValue={item.idioma}
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
            Actualizar Libro
          </Button>
        </form>
      </div>
    </Container>
    </React.Fragment>
    
  );
}