import React, {useEffect} from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import Swal from 'sweetalert2';

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
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function SignIn() {

  useEffect(() => {
    cargar();
  }, []);
  
  const cargar = async() =>{
    if(localStorage.getItem('recordar')){
      window.location = '/home';
    }
  }
  
  const { register, handleSubmit } = useForm();
  const onSubmit = data => {


    if(!data.email || !data.pass) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Debe completar el email y la contraseña'
      })
    }else{
      axios
    .post("http://127.0.0.1:5000/api/login",data)
    .then(
      response => {
        if(response.status === 200){
          localStorage.setItem('Token_react', response.data.token);
          if(data.recordar == "remember") {
            localStorage.setItem('recordar', data.recordar);
          }else{
            if(localStorage.getItem('recordar')){
              localStorage.removeItem('recordar');
            }
          }
          window.location = '/home'
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
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Ingresar
        </Typography>
        <form onSubmit={handleSubmit(onSubmit)} className={classes.form} noValidate>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email"
            name="email"
            autoComplete="off"
            autoFocus
            inputRef={register}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="pass"
            label="Contraseña"
            type="password"
            id="pass"
            autoComplete="current-password"
            inputRef={register}
          />
          <FormControlLabel
            control={<Checkbox value="remember" name="recordar" color="primary" inputRef={register} />}
            label="Recuerdame"
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Ingresar
          </Button>
          <Grid container>
            <Grid item xs>
              <Link href="#" variant="body2">
                Olvidaste tu contraseña?
              </Link>
            </Grid>
            <Grid item>
              <Link  href="/registro" variant="body2">
                {"No tienes cuenta? Registrate"}
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
      <Box mt={8}>
        <Copyright />
      </Box>
    </Container>
  );
}