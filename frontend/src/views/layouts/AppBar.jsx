import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';
import { makeStyles } from '@material-ui/core/styles';


const useStyles = makeStyles((theme) => ({
  '@global': {
    ul: {
      margin: 0,
      padding: 0,
      listStyle: 'none',
    },
  },
  appBar: {
    borderBottom: `1px solid ${theme.palette.divider}`,
  },
  toolbar: {
    flexWrap: 'wrap',
  },
  toolbarTitle: {
    flexGrow: 1,
  },
  link: {
    margin: theme.spacing(1, 1.5),
  },
  heroContent: {
    padding: theme.spacing(8, 0, 6),
  },
  cardHeader: {
    backgroundColor:
      theme.palette.type === 'light' ? theme.palette.grey[200] : theme.palette.grey[700],
  },
  cardPricing: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'baseline',
    marginBottom: theme.spacing(2),
  },
  footer: {
    borderTop: `1px solid ${theme.palette.divider}`,
    marginTop: theme.spacing(8),
    paddingTop: theme.spacing(3),
    paddingBottom: theme.spacing(3),
    [theme.breakpoints.up('sm')]: {
      paddingTop: theme.spacing(6),
      paddingBottom: theme.spacing(6),
    },
  },
}));

const cerrarSesion = () => {
  localStorage.removeItem('Token_react');
  localStorage.removeItem('alumno_prestamo');
  localStorage.removeItem('fecha_prestamo');
  localStorage.removeItem('libros_prestamo');
  window.location = '/';
};

export default function Barra() {
  const classes = useStyles();
  return(
    <React.Fragment>
      <AppBar position="static" color="default" elevation={0} className={classes.appBar}>
        <Toolbar className={classes.toolbar}>
          <Typography variant="h6" color="inherit" noWrap className={classes.toolbarTitle}>
            <Link variant="button" color="textPrimary" href="/home" className={classes.link}>
              Biblioteca
            </Link>
          </Typography>
          <nav>
            <Link variant="button" color="textPrimary" href="/prestamos" className={classes.link}>
              Prestamos
            </Link>
            <Link variant="button" color="textPrimary" href="/libros" className={classes.link}>
              Libros
            </Link>
            <Link variant="button" color="textPrimary" href="/alumnos" className={classes.link}>
              Alumnos
            </Link>
          </nav>
          <Button color="primary" variant="outlined" onClick={cerrarSesion} className={classes.link}>
            Cerrar Sesion
          </Button>
        </Toolbar>
      </AppBar>
    </React.Fragment>
  )
}