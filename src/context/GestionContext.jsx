import { createContext, useState, useEffect } from "react";

const GestionContext = createContext();

const GestionProvider = ({children}) => {
  const [tiquetsTotal, setTiquetsTotal] = useState(() => {
      const storedTiquets = localStorage.getItem('dades_tiquets');
      return storedTiquets ? JSON.parse(storedTiquets) : [
        {
          id: 1,
          fecha: '12/02/2025',
          aula: 'A201',
          grupo: 'DAW1',
          ordenador: 'PC5',
          descripcion: 'No arranca el sistema operativo',
          alumno: 'Laura García',
          resuelto: false
        },
        {
          id: 2,
          fecha: '13/02/2025',
          aula: 'B102',
          grupo: 'DAW2',
          ordenador: 'PC12',
          descripcion: 'Problemas con la conexión a internet',
          alumno: 'Carlos Rodríguez',
          resuelto: false
        },
        {
          id: 3,
          fecha: '14/02/2025',
          aula: 'C305',
          grupo: 'ASIR',
          ordenador: 'PC8',
          descripcion: 'Error en la instalación de software',
          alumno: 'María López',
          resuelto: false
        },
        {
          id: 4,
          fecha: '14/02/2025',
          aula: 'D401',
          grupo: 'SMR',
          ordenador: 'PC3',
          descripcion: 'Pantalla azul recurrente',
          alumno: 'Javier Martínez',
          resuelto: false
        },
        {
          id: 5,
          fecha: '14/02/2025',
          aula: 'A103',
          grupo: 'DAW1',
          ordenador: 'PC15',
          descripcion: 'Teclado no responde',
          alumno: 'Ana Sánchez',
          resuelto: false
        },
        {
          id: 6,
          fecha: '10/02/2025',
          fecha_resuelto: '11/02/2025',
          aula: 'B205',
          grupo: 'DAW2',
          ordenador: 'PC7',
          descripcion: 'Problema con el software de diseño',
          alumno: 'Pedro Gómez',
          resuelto: true
        },
        {
          id: 7,
          fecha: '11/02/2025',
          fecha_resuelto: '12/02/2025',
          aula: 'C103',
          grupo: 'ASIR',
          ordenador: 'PC10',
          descripcion: 'Fallo en la configuración de red',
          alumno: 'Elena Fernández',
          resuelto: true
        },
        {
          id: 8,
          fecha: '12/02/2025',
          fecha_resuelto: '13/02/2025',
          aula: 'A301',
          grupo: 'SMR',
          ordenador: 'PC2',
          descripcion: 'Problema con el arranque dual',
          alumno: 'Miguel Álvarez',
          resuelto: true
        },
        {
          id: 9,
          fecha: '13/02/2025',
          fecha_resuelto: '14/02/2025',
          aula: 'D102',
          grupo: 'DAW1',
          ordenador: 'PC9',
          descripcion: 'Error en la compilación de código',
          alumno: 'Sara Ruiz',
          resuelto: true
        },
        {
          id: 10,
          fecha: '14/02/2025',
          fecha_resuelto: '14/02/2025',
          aula: 'B104',
          grupo: 'DAW2',
          ordenador: 'PC11',
          descripcion: 'Problema con el entorno de desarrollo',
          alumno: 'David Torres',
          resuelto: true
        }
      ];
  });

  const [usuarios, setUsuarios] = useState(() => {
      const storedUsuarios = localStorage.getItem('dades_usuaris');
      return storedUsuarios ? JSON.parse(storedUsuarios) : [
        {
          rol: "user",
          nombre: "Ana García",
          id: 1,
          email: "ana.garcia@ejemplo.com",
          password: "Us3r2025#"
      },
      {
          rol: "admin",
          nombre: "Gabriel Bascope",
          id: 2,
          email: "gabriel.bascope@ejemplo.com",
          password: "Adm1n2025!"
      },
      {
          rol: "user",
          nombre: "María López",
          id: 3,
          email: "maria.lopez@ejemplo.com",
          password: "Ed1tor2025$"
      },
      {
          rol: "user",
          nombre: "Juan Martínez",
          id: 4,
          email: "juan.martinez@ejemplo.com",
          password: "Us3r2025%"
      },
      {
          rol: "profesor",
          nombre: "Laura Sánchez",
          id: 5,
          email: "laura.sanchez@ejemplo.com",
          password: "M0d2025&"
      }
      ];
  });

  useEffect(() => {
    localStorage.setItem('dades_tiquets', JSON.stringify(tiquetsTotal));
    localStorage.setItem('dades_usuaris', JSON.stringify(usuarios));
  }, [tiquetsTotal, usuarios]);

  return (
    <GestionContext.Provider value={{
      tiquetsTotal, 
      setTiquetsTotal, 
      usuarios, 
      setUsuarios
    }}>
      {children}
    </GestionContext.Provider>
  );
}

export { GestionContext, GestionProvider};
