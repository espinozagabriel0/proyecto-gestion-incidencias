import { useContext } from "react";
import HeaderMenu from "./HeaderMenu";
import TicketsPendents from "./tables/TicketsPendents";
import TicketsResolts from "./tables/TicketsResolts";
import { GestionContext } from "../context/GestionContext";
import { Link, Navigate } from "react-router-dom";

export default function PanelComponent() {
  // obtener array dadesTiquets y filtrar por propiedad resuelto
  const { tiquetsTotal } = useContext(GestionContext);
  const usuarioActual = JSON.parse(
    localStorage.getItem("usuari_actual")
  )?.nombre;

  const ticketsPendientes = tiquetsTotal.filter((ticket) => !ticket.resuelto);

  const ticketsResueltos = tiquetsTotal.filter((ticket) => ticket.resuelto);

  if (!usuarioActual) {
    return <Navigate to={"/"} />;
  }

  return (
    <>
      <HeaderMenu />
      <main className="container mt-5">
        <div className="d-flex align-items-center justify-content-between">
          <h1>Administración de incidencias</h1>
          <Link to={"/ticket"} className="" style={{border: "none", fontSize: "30px"}}>
            <i className="fa-solid fa-square-plus fa-xl"></i>
          </Link>
        </div>
        <h2 className="mt-5">Tickets pendientes</h2>
        <TicketsPendents tickets={ticketsPendientes} />

        <h2 className="mt-5">Tickets resueltos</h2>
        <TicketsResolts tickets={ticketsResueltos} />
      </main>

      {/* Modal */}
      <div
        className="modal fade"
        id="exampleModal"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">
                Observaciones
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <p>
                Código incidencia: <span>123546</span>
              </p>
              <label htmlFor="comentario" className="form-label">
                Comentario:
              </label>
              <input
                className="form-control"
                defaultValue="Estee es un comentario sobre esta incidencia"
              />
              <p className="small text-end">
                Autor: <span>Pepe Loco</span>
              </p>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Cancelar
              </button>
              <button type="button" className="btn btn-primary">
                Guardar cambios
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
