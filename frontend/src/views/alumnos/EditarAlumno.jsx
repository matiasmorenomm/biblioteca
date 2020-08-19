import React, {useEffect, useState} from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
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

  const {rut} = useParams();

  useEffect(() => {
    cargar();
  }, []);

  const cargar = async() =>{
    const { data } = await axios.get("http://127.0.0.1:5000/alumnos-api/alumno/" + rut);
    /* setItem es la funcion asignada para cambiar el valor de item */
    setItem(data.alumno);
    return null;
  }
  const { register, handleSubmit } = useForm();
  const onSubmit = data => {

    if( !data.nombre || !data.rut ) {
      Swal.fire({
        icon: 'error',
        title: 'Opss...',
        text: 'Debe rellenar todo los campos'
      })
    }else{
      axios
    .put("http://127.0.0.1:5000/alumnos-api/alumno/" + rut ,data)
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
          Actualizar Alumno
        </Typography>
        <form onSubmit={handleSubmit(onSubmit)} className={classes.form} noValidate>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Typography>
                Nombre:
              </Typography>
              <TextField
                autoComplete
                name="nombre"
                variant="outlined"
                defaultValue={item.nombre}
                required
                fullWidth
                id="nombre"
                label={item.nombre}
                autoFocus
                inputRef={register}
              />
            </Grid>
            <Grid item xs={12}>
              <Typography>
                Rut:
              </Typography>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="rut"
                name="rut"
                value={item.rut}
                defaultValue={item.rut}
                readonly
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
            Actualizar Alumno
          </Button>
        </form>
      </div>
    </Container>
    </React.Fragment>
    
  );
}