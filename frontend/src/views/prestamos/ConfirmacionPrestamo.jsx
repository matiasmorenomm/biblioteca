import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';

const useStyles = makeStyles((theme) => ({
  listItem: {
    padding: theme.spacing(1, 0),
  },
  total: {
    fontWeight: 700,
  },
  title: {
    marginTop: theme.spacing(2),
  },
}));




export default function Review() {

  const al =  JSON.parse(localStorage.getItem('alumno_prestamo'));
  const lib =  JSON.parse(localStorage.getItem('libros'));

  const [libros] = useState(lib);
  const [alumno] = useState(al);

  const classes = useStyles();

  const handleDateChange = (date) => {
    localStorage.setItem('fecha_prestamo', JSON.stringify(date.target.value));
  };

  return (
    <React.Fragment>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <Typography variant="h6" gutterBottom className={classes.title}>
            Libros
          </Typography>
          {libros.map((lib) => (
            <ListItem className={classes.listItem} >
            <ListItemText primary={lib.titulo}/>
            <Typography variant="body2">{lib.codigo}</Typography>
          </ListItem>
          ))}
          
        </Grid>
      </Grid>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <Typography variant="h6" gutterBottom className={classes.title}>
            Alumno
          </Typography>
          {alumno.map((al) => (
            <ListItem className={classes.listItem} >
            <ListItemText primary={al.nombre}/>
            <Typography variant="body2">{al.rut}</Typography>
          </ListItem>
          ))}
        </Grid>
      </Grid>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
        <Typography variant="h6" gutterBottom className={classes.title}>
            Fecha de entrega 
          </Typography>
        <TextField
          id="fecha_entrega"
          name="fecha_entrega"
          type="date"
          className={classes.textField}
          onChange={handleDateChange}
          InputLabelProps={{
            shrink: true,
          }}
        />
        </Grid>
      </Grid>
    </React.Fragment>
  );
}