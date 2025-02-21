import HeaderMenu from "./HeaderMenu";
import TicketsPendents from "./tables/TicketsPendents";
import TicketsResolts from "./tables/TicketsResolts";

export default function PanelComponent() {

    // obtener array dadesTiquets
    const tickets = JSON.parse(localStorage.getItem('dades_tiquets'))
    console.log('tickets: ', tickets)

    
    const ticketsPendientes = tickets.filter((ticket) => !ticket.resuelto)

    const ticketsResueltos = tickets.filter((ticket) => ticket.resuelto)

    return (
        <>
            <HeaderMenu/>
            <main className="container mt-5">
                <h1>Administración de incidencias</h1>
                <h2 className="mt-5">Tickets pendientes</h2>
                <TicketsPendents tickets={ticketsPendientes}/>

                <h2 className="mt-5">Tickets resueltos</h2>
               <TicketsResolts tickets={ticketsResueltos}/>
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
  