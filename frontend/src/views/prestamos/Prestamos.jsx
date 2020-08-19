import React, { useState, useEffect } from "react";
import MaterialDatatable from "material-datatable";
import axios from 'axios';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '../layouts/AppBar';

export default function Prestamos() {

  const [item, setItem] = useState([]);

  const columns = [
    {
     name: "Alumno",
     field: "",
     options: {
      filter: true,
      sort: true,
     }
    },
    {
     name: "Codigo",
     field: "codigo",
     options: {
      filter: true,
      sort: true,
     }
    },
    {
     name: "Fecha Prestamo",
     field: "fecha",
     options: {
      filter: true,
      sort: true,
     }
    },
    {
     name: "Fecha Devolucion Programada",
     field: "fecha_programada",
     options: {
      filter: true,
      sort: true,
     }
    },
    {
      name: "Fecha Devolucion",
      field: "fecha_devolucion",
      options: {
       filter: true,
       sort: true,
      }
     },
   ];

   /* Efectos secudarios */
   /* Se utiliza el useEfect despues de que  */
  
  useEffect(() => {
    cargar();
  }, []);

  const cargar = async() =>{
    const { data } = await axios.get("http://127.0.0.1:5000/prestamos-api/prestamos");
    /* setItem es la funcion asignada para cambiar el valor de item */
    setItem(data.prestamos);
    return null;
  }
  
  return (
    <React.Fragment>
      <CssBaseline />
      <AppBar></AppBar>
        <MaterialDatatable
        title={"Libros"}
        data={item}
        columns={columns}
        options={{
          selectableRows: false,
          print: false,
          onlyOneRowCanBeSelected: false,
          textLabels: {
            body: {
              noMatch: "Lo sentimos, no se encuentran registros",
              toolTip: "Sort",
            },
            pagination: {
              next: "Siguiente",
              previous: "Página Anterior",
              rowsPerPage: "Filas por página:",
              displayRows: "de",
            },
          },
          download: false,
          pagination: true,
          rowsPerPage: 5,
          usePaperPlaceholder: true,
          rowsPerPageOptions: [5, 10, 25],
          sortColumnDirection: "desc",
        }}
      />
    </React.Fragment>
    
  );
}