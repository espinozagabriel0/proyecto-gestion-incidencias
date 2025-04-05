import { useContext, useEffect, useState } from "react";
import { GestionContext } from "../../context/GestionContext";
import { Link } from "react-router-dom";
import { format } from "date-fns";
import { es } from "date-fns/locale";
import {
  resolverTicket,
  getTickets,
  eliminarTicket,
  updateTicket,
} from "../../lib/utils";
import { supabase } from "../../supabase/supabase";

export default function TicketsPendents({ tickets }) {
  const { setTiquetsTotal, usuarioActual, setTickets } =
    useContext(GestionContext);
  const [selectedTicket, setSelectedTicket] = useState(null);

  const [aula, setAula] = useState(selectedTicket ? selectedTicket?.aula : "");
  const [grupo, setGrupo] = useState(
    selectedTicket ? selectedTicket?.grupo : ""
  );
  const [ordenador, setOrdenador] = useState(
    selectedTicket ? selectedTicket?.ordenador : ""
  );
  const [descripcion, setDescripcion] = useState(
    selectedTicket ? selectedTicket?.descripcion : ""
  );
  const [alumno, setAlumno] = useState(
    selectedTicket ? selectedTicket?.alumno : ""
  );

  const [fecha, setFecha] = useState(
    selectedTicket ? selectedTicket?.fecha : ""
  );

  const fetchTickets = async () => {
    const updatedTickets = await getTickets();
    setTickets(updatedTickets);
  };

  const handleResolve = async (id) => {
    try {
      const ticketResuelto = await resolverTicket(id);
      console.log("Ticket resuelto:", ticketResuelto);
    } catch (error) {
      console.error("Error al resolver el ticket:", error);
    }
  };

  const handleRemove = async (id) => {
    try {
      const ticketEliminado = await eliminarTicket(id);
      console.log("Ticket eliminado:", ticketEliminado);
    } catch (error) {
      console.error("Error al eliminar el ticket:", error);
    }
  };

  const handleUpdateTicket = async (e) => {
    e.preventDefault();

    if (aula && grupo && ordenador && descripcion && alumno) {
      try {
        const updatedData = {
          aula,
          grupo,
          ordenador,
          descripcion,
          alumno,
        };
        console.log(updatedData, selectedTicket?.id);

        const updatedTicket = await updateTicket(
          updatedData,
          selectedTicket?.id
        );
        console.log("Ticket actualizado:", updatedTicket);
      } catch (error) {
        console.error("Error al actualizar el ticket:", error.message);
      }
    } else {
      console.error("Error: Todos los campos deben estar completos.");
    }
  };

  useEffect(() => {
    if (selectedTicket) {
      setAula(selectedTicket.aula);
      setGrupo(selectedTicket.grupo);
      setOrdenador(selectedTicket.ordenador);
      setDescripcion(selectedTicket.descripcion);
      setAlumno(selectedTicket.alumno);
      setFecha(selectedTicket?.created_at);
    }
  }, [selectedTicket]);

  useEffect(() => {
    const changes = supabase
      .channel("schema-db-changes")
      .on(
        "postgres_changes",
        {
          schema: "public",
          event: "*",
          table: "Tickets",
        },
        (payload) => {
          fetchTickets();
        }
      )
      .subscribe();

    return () => {
      changes.unsubscribe();
    };
  }, []);

  return (
    <>
      <table className="table mt-4">
        <thead>
          <tr>
            <th>Código</th>
            <th>Fecha</th>
            <th>Aula</th>
            <th>Grupo</th>
            <th>Ordenador</th>
            <th>Descripción</th>
            <th>Alumno</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {tickets && tickets.length > 0 ? (
            (usuarioActual?.role == "user"
              ? tickets.filter(
                  (ticketsFilter) =>
                    ticketsFilter?.usuarioId == usuarioActual?.id
                )
              : tickets
            ).map((ticket) => (
              <tr key={ticket.id}>
                <td>{ticket?.id}</td>
                <td>
                  {format(ticket?.created_at, "dd/MM/yyyy HH:mm", {
                    locale: es,
                  })}
                </td>
                <td>{ticket?.aula}</td>
                <td>{ticket?.grupo}</td>
                <td>{ticket?.ordenador}</td>
                <td>{ticket?.descripcion}</td>
                <td>{ticket?.alumno}</td>
                <td>
                  {usuarioActual?.role == "admin" && (
                    <>
                      <button
                        onClick={() => handleResolve(ticket.id)}
                        className="btn btn-success me-1"
                        title="Resolver ticket"
                      >
                        Resolver
                      </button>
                      <button
                        className="btn btn-warning me-1"
                        title="Editar Ticket"
                        data-bs-toggle="modal"
                        data-bs-target="#exampleModal"
                        onClick={() => setSelectedTicket(ticket)}
                      >
                        <i className="bi bi-pencil"></i>
                      </button>
                      <button
                        onClick={() => handleRemove(ticket.id)}
                        className="btn btn-danger me-1"
                        title="Eliminar ticket"
                      >
                        <i className="bi bi-trash3"></i>
                      </button>
                    </>
                  )}
                  <button className="btn btn-info me-1" title="Ver comentarios">
                    <Link to={`/comments/${ticket.id}`}>
                      <i className="bi bi-chat-left-text"></i>
                    </Link>
                  </button>

                  {/* Boton para ver info del ticket */}
                  <button
                    onClick={() => setSelectedTicket(ticket)}
                    className="btn btn-info"
                    data-bs-toggle="modal"
                    data-bs-target="#modalInfo"
                    title="Más Info"
                  >
                    <i className="bi bi-info"></i>
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="8" className="text-center">
                No hay tickets pendientes en este momento.
              </td>
            </tr>
          )}
        </tbody>
      </table>
      {/* Modal Para Editar*/}
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
              {selectedTicket && (
                <form id="updateTicketForm" onSubmit={handleUpdateTicket}>
                  <div className="mb-3">
                    <label htmlFor="aula" className="form-label">
                      Aula
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="aula"
                      name="aula"
                      value={aula}
                      onChange={(e) => setAula(e.target.value)}
                      placeholder="Introduce el aula"
                      required
                    />
                  </div>

                  <div className="mb-3">
                    <label htmlFor="grupo" className="form-label">
                      Grupo
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="grupo"
                      name="grupo"
                      value={grupo}
                      onChange={(e) => setGrupo(e.target.value)}
                      placeholder="Introduce el grupo"
                      required
                    />
                  </div>

                  <div className="mb-3">
                    <label htmlFor="ordenador" className="form-label">
                      Ordenador
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="ordenador"
                      name="ordenador"
                      value={ordenador}
                      onChange={(e) => setOrdenador(e.target.value)}
                      placeholder="Introduce el ordenador"
                      required
                    />
                  </div>

                  <div className="mb-3">
                    <label htmlFor="descripcion" className="form-label">
                      Descripción
                    </label>
                    <textarea
                      className="form-control"
                      id="descripcion"
                      value={descripcion}
                      onChange={(e) => setDescripcion(e.target.value)}
                      name="descripcion"
                      rows="4"
                      placeholder="Describe el problema o situación..."
                      required
                    ></textarea>
                  </div>

                  <div className="mb-3">
                    <label htmlFor="alumno" className="form-label">
                      Alumno
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="alumno"
                      value={alumno}
                      onChange={(e) => setAlumno(e.target.value)}
                      name="alumno"
                      placeholder="Introduce el nombre del alumno"
                      required
                    />
                  </div>
                </form>
              )}
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Cancelar
              </button>
              <button
                type="submit"
                form="updateTicketForm"
                className="btn btn-primary"
                data-bs-dismiss="modal"
              >
                Guardar cambios
              </button>
            </div>
          </div>
        </div>
      </div>
      {/* Modal para ver información del ticket */}
      <div
        className="modal fade"
        id="modalInfo"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">
                Información Ticket #{selectedTicket?.id}
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              {selectedTicket && (
                <>
                  <div className="mb-3">
                    <label className="form-label text-decoration-underline">
                      Aula:{" "}
                    </label>
                    <p>{aula}</p>
                  </div>

                  <div className="mb-3">
                    <label className="form-label text-decoration-underline">
                      Grupo:{" "}
                    </label>
                    <p>{grupo}</p>
                  </div>

                  <div className="mb-3">
                    <label className="form-label text-decoration-underline">
                      Ordenador:{" "}
                    </label>
                    <p>{ordenador}</p>
                  </div>

                  <div className="mb-3">
                    <label className="form-label text-decoration-underline">
                      Descripción:{" "}
                    </label>
                    <p>{descripcion}</p>
                  </div>

                  <div className="mb-3">
                    <label className="form-label text-decoration-underline">
                      Alumno:{" "}
                    </label>
                    <p>{alumno}</p>
                  </div>

                  <div className="mb-3">
                    <label className="form-label text-decoration-underline">
                      Fecha:{" "}
                    </label>
                    <p>
                      {fecha &&
                        format(fecha, "dd/MM/yyyy HH:mm", { locale: es })}
                    </p>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
