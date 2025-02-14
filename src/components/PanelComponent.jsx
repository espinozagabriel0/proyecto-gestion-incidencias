import HeaderMenu from "./HeaderMenu";
import TicketsPendents from "./tables/TicketsPendents";
import TicketsResolts from "./tables/TicketsResolts";

export default function PanelComponent() {

    const tiquets_pendientes = [
        {
          id: 1,
          fecha: '12/02/2025',
          aula: 'A201',
          grupo: 'DAW1',
          ordenador: 'PC5',
          descripcion: 'No arranca el sistema operativo',
          alumno: 'Laura García'
        },
        {
          id: 2,
          fecha: '13/02/2025',
          aula: 'B102',
          grupo: 'DAW2',
          ordenador: 'PC12',
          descripcion: 'Problemas con la conexión a internet',
          alumno: 'Carlos Rodríguez'
        },
        {
          id: 3,
          fecha: '14/02/2025',
          aula: 'C305',
          grupo: 'ASIR',
          ordenador: 'PC8',
          descripcion: 'Error en la instalación de software',
          alumno: 'María López'
        },
        {
          id: 4,
          fecha: '14/02/2025',
          aula: 'D401',
          grupo: 'SMR',
          ordenador: 'PC3',
          descripcion: 'Pantalla azul recurrente',
          alumno: 'Javier Martínez'
        },
        {
          id: 5,
          fecha: '14/02/2025',
          aula: 'A103',
          grupo: 'DAW1',
          ordenador: 'PC15',
          descripcion: 'Teclado no responde',
          alumno: 'Ana Sánchez'
        }
    ]
      
    const tiquets_resueltos = [
    {
        id: 6,
        fecha: '10/02/2025',
        fecha_resuelto: '11/02/2025',
        aula: 'B205',
        grupo: 'DAW2',
        ordenador: 'PC7',
        descripcion: 'Problema con el software de diseño',
        alumno: 'Pedro Gómez'
    },
    {
        id: 7,
        fecha: '11/02/2025',
        fecha_resuelto: '12/02/2025',
        aula: 'C103',
        grupo: 'ASIR',
        ordenador: 'PC10',
        descripcion: 'Fallo en la configuración de red',
        alumno: 'Elena Fernández'
    },
    {
        id: 8,
        fecha: '12/02/2025',
        fecha_resuelto: '13/02/2025',
        aula: 'A301',
        grupo: 'SMR',
        ordenador: 'PC2',
        descripcion: 'Problema con el arranque dual',
        alumno: 'Miguel Álvarez'
    },
    {
        id: 9,
        fecha: '13/02/2025',
        fecha_resuelto: '14/02/2025',
        aula: 'D102',
        grupo: 'DAW1',
        ordenador: 'PC9',
        descripcion: 'Error en la compilación de código',
        alumno: 'Sara Ruiz'
    },
    {
        id: 10,
        fecha: '14/02/2025',
        fecha_resuelto: '14/02/2025',
        aula: 'B104',
        grupo: 'DAW2',
        ordenador: 'PC11',
        descripcion: 'Problema con el entorno de desarrollo',
        alumno: 'David Torres'
    }
    ]
      

    const ticketsArray = [{
        pendientes: tiquets_pendientes,
        resueltos: tiquets_resueltos
    }]

    localStorage.setItem('dades_tiquets', JSON.stringify(ticketsArray))
    localStorage.setItem('dades_usuaris', JSON.stringify(usuarios))


    const tickets = JSON.parse(localStorage.getItem('dades_tiquets'))
    console.log(tickets)


    const usuarios = [
        {
            rol: "user",
            nombre: "Ana García",
            id: 1001,
            email: "ana.garcia@ejemplo.com",
            password: "Us3r2025#"
        },
        {
            rol: "admin",
            nombre: "Gabriel Bascope",
            id: 1002,
            email: "gabriel.bascope@ejemplo.com",
            password: "Adm1n2025!"
        },
        {
            rol: "user",
            nombre: "María López",
            id: 1003,
            email: "maria.lopez@ejemplo.com",
            password: "Ed1tor2025$"
        },
        {
            rol: "user",
            nombre: "Juan Martínez",
            id: 1004,
            email: "juan.martinez@ejemplo.com",
            password: "Us3r2025%"
        },
        {
            rol: "profesor",
            nombre: "Laura Sánchez",
            id: 1005,
            email: "laura.sanchez@ejemplo.com",
            password: "M0d2025&"
        }
    ];
    

    return (
        <>
            <HeaderMenu/>
            <main className="container mt-5">
                <h1>Administración de incidencias</h1>
                <h2 className="mt-5">Tickets pendientes</h2>
                <TicketsPendents tickets={tickets[0].pendientes}/>

                <h2 className="mt-5">Tickets resueltos</h2>
               <TicketsResolts tickets={tickets[0].resueltos}/>
            </main>
        
            {/* Modal */}
            <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">Observaciones</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <p>Código incidencia: <span>123546</span></p>
                            <label htmlFor="comentario" className="form-label">Comentario:</label>
                            <input className="form-control" defaultValue="Estee es un comentario sobre esta incidencia" />
                            <p className="small text-end">Autor: <span>Pepe Loco</span></p>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Cancelar</button>
                            <button type="button" className="btn btn-primary">Guardar cambios</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
  