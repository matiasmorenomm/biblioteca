import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from './layouts/AppBar';
import Paper from '@material-ui/core/Paper';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Button from '@material-ui/core/Button';
import Link from '@material-ui/core/Link';
import Typography from '@material-ui/core/Typography';
import BuscarLibro from './libros/BuscarLibro';
import BuscarAlumno from './alumnos/BuscarAlumno';
import ConfirmacionPrestamo from './prestamos/ConfirmacionPrestamo';
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
  appBar: {
    position: 'relative',
  },
  layout: {
    width: 'auto',
    marginLeft: theme.spacing(2),
    marginRight: theme.spacing(2),
    [theme.breakpoints.up(600 + theme.spacing(2) * 2)]: {
      width: 1000,
      marginLeft: 'auto',
      marginRight: 'auto',
    },
  },
  paper: {
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(3),
    padding: theme.spacing(2),
    [theme.breakpoints.up(600 + theme.spacing(3) * 2)]: {
      marginTop: theme.spacing(6),
      marginBottom: theme.spacing(6),
      padding: theme.spacing(3),
    },
  },
  stepper: {
    padding: theme.spacing(3, 0, 5),
  },
  buttons: {
    display: 'flex',
    justifyContent: 'flex-end',
  },
  button: {
    marginTop: theme.spacing(3),
    marginLeft: theme.spacing(1),
  },
}));

const steps = ['Seleccionar libro', 'Seleccionar Alumno', 'Confirmar Prestamo'];

function getStepContent(step) {
  switch (step) {
    case 0:
      return <BuscarLibro />;
    case 1:
      return <BuscarAlumno />;
    case 2:
      return <ConfirmacionPrestamo />;
    default:
      throw new Error('Unknown step');
  }
}

export default function Checkout() {

  

  const classes = useStyles();
  const [activeStep, setActiveStep] = React.useState(0);

  const prestamo = () => {
    const al =  JSON.parse(localStorage.getItem('alumno_prestamo'));
    const lib =  JSON.parse(localStorage.getItem('libros_prestamo'));
    const fechaa =  JSON.parse(localStorage.getItem('fecha_prestamo'));

    var presta = new Object();

    presta.fecha_programada = fechaa;
    presta.alumno = al[0]._id;
    presta.libro = lib;

    axios
    .post("http://127.0.0.1:5000/prestamos-api/prestamo", presta)
    .then(
      response => {
        if(response.status === 200) {
          setActiveStep(activeStep + 1);
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

  const handleNext = () => {
    if( activeStep === steps.length - 1 ) {
      prestamo();
    }else{
      setActiveStep(activeStep + 1);
    }
  };

  const handleBack = () => {
    setActiveStep(activeStep - 1);
  };

  return (
    <React.Fragment>
      <CssBaseline />
      <AppBar></AppBar>
      <main className={classes.layout}>
        <Paper className={classes.paper}>
          <Typography component="h1" variant="h4" align="center">
            Prestamo
          </Typography>
          <Stepper activeStep={activeStep} className={classes.stepper}>
            {steps.map((label) => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>
          <React.Fragment>
            {activeStep === steps.length ? (
              <React.Fragment>
                <Typography variant="h5" gutterBottom>
                  Su prestamo se realizo de forma correcta
                </Typography>
                <Typography variant="subtitle1">
                  El prestamo ya se encuentra registrado en el sistema, recuerde devolver los libros en la fecha estima para asi no sufrir sanciones
                </Typography>
              </React.Fragment>
            ) : (
              <React.Fragment>
                {getStepContent(activeStep)}
                <div className={classes.buttons}>
                  {activeStep !== 0 && (
                    <Button onClick={handleBack} className={classes.button}>
                      Back
                    </Button>
                  )}
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={handleNext}
                    className={classes.button}
                  >
                    {activeStep === steps.length - 1 ? 'Confirmar Prestamo' : 'Siguiente'}
                  </Button>
                </div>
              </React.Fragment>
            )}
          </React.Fragment>
        </Paper>
        <Copyright />
      </main>
    </React.Fragment>
  );
}