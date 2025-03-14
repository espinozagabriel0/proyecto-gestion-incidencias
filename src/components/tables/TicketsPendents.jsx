import { useContext, useEffect, useState } from "react";
import { GestionContext } from "../../context/GestionContext";
import { Link } from "react-router-dom";

export default function TicketsPendents({ tickets }) {
  const { setTiquetsTotal } = useContext(GestionContext);
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

  // crea un nuevo array con tickets y si el id coincide, actualiza la propiedad resuelto, sino, se devuelve el ticket sin actualizar
  const handleResolve = (id) => {
    const date = new Date();
    const formattedDate = date.toLocaleDateString();

    setTiquetsTotal((prevTickets) =>
      prevTickets.map((ticket) =>
        ticket.id == id
          ? { ...ticket, resuelto: true, fecha_resuelto: formattedDate }
          : ticket
      )
    );
  };

  const handleRemove = (id) => {
    // sobreescribe el array en localStorage sin el ticket seleccionado
    setTiquetsTotal((prevTickets) =>
      prevTickets.filter((ticket) => ticket.id !== id)
    );
  };

  const handleUpdateTicket = (e) => {
    e.preventDefault();

    if (aula && grupo && ordenador && descripcion && alumno) {
      setTiquetsTotal((prevTickets) =>
        prevTickets.map((ticket) =>
          ticket.id == selectedTicket.id
            ? {
                ...ticket,
                aula,
                grupo,
                ordenador,
                descripcion,
                alumno,
              }
            : ticket
        )
      );
    }
  };

  useEffect(() => {
    if (selectedTicket) {
      setAula(selectedTicket.aula);
      setGrupo(selectedTicket.grupo);
      setOrdenador(selectedTicket.ordenador);
      setDescripcion(selectedTicket.descripcion);
      setAlumno(selectedTicket.alumno);
    }
  }, [selectedTicket]);

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
          {tickets.map((ticket) => (
            <tr key={ticket.id}>
              <td>{ticket.id}</td>
              <td>{ticket.fecha}</td>
              <td>{ticket.aula}</td>
              <td>{ticket.grupo}</td>
              <td>{ticket.ordenador}</td>
              <td>{ticket.descripcion}</td>
              <td>{ticket.alumno}</td>
              <td>
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
                <button className="btn btn-info me-1" title="Ver comentarios">
                  <Link to={`/comments/${ticket.id}`}>
                    <i className="bi bi-chat-left-text"></i>
                  </Link>
                </button>
                <button
                  onClick={() => handleRemove(ticket.id)}
                  className="btn btn-danger"
                  title="Eliminar ticket"
                >
                  <i className="bi bi-trash3"></i>
                </button>
              </td>
            </tr>
          ))}
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
    </>
  );
}
