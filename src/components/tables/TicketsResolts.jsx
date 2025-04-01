import { useContext, useEffect, useState } from "react";
import { GestionContext } from "../../context/GestionContext";
import { Link } from "react-router-dom";

export default function TicketsResolts({ tickets }) {
  const { setTiquetsTotal, usuarioActual } = useContext(GestionContext);
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
  const [fechaResuelto, setFechaResuelto] = useState(
    selectedTicket ? selectedTicket?.fecha_resuelto : ""
  );

  const handleRemove = (id) => {
    // sobreescribe el array en localStorage sin el ticket seleccionado
    setTiquetsTotal((prevTickets) =>
      prevTickets.filter((ticket) => ticket.id !== id)
    );
  };

  useEffect(() => {
    if (selectedTicket) {
      setAula(selectedTicket.aula);
      setGrupo(selectedTicket.grupo);
      setOrdenador(selectedTicket.ordenador);
      setDescripcion(selectedTicket.descripcion);
      setAlumno(selectedTicket.alumno);
      setFecha(selectedTicket.fecha);
      setFechaResuelto(selectedTicket.fecha_resuelto);
    }
  }, [selectedTicket]);

  return (
    <>
      <table className="table mt-4">
        <thead>
          <tr>
            <th>Código</th>
            <th>Fecha</th>
            <th>Fecha resuelto</th>
            <th>Aula</th>
            <th>Grupo</th>
            <th>Ordenador</th>
            <th>Descripción</th>
            <th>Alumno</th>
            <th></th>
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
                <td>{ticket.id}</td>
                <td>{ticket.fecha}</td>
                <td>{ticket.fecha_resuelto}</td>
                <td>{ticket.aula}</td>
                <td>{ticket.grupo}</td>
                <td>{ticket.ordenador}</td>
                <td>{ticket.descripcion}</td>
                <td>{ticket.alumno}</td>
                <td>
                  <button className="btn btn-info" title="Ver comentarios">
                    <Link to={`/comments/${ticket.id}`}>
                      <i className="bi bi-chat-left-text"></i>
                    </Link>
                  </button>
                </td>
                <td>
                  {usuarioActual?.role == "admin" && (
                    <button
                      onClick={() => handleRemove(ticket.id)}
                      className="btn btn-danger"
                      title="Eliminar ticket"
                    >
                      <i className="bi bi-trash3"></i>
                    </button>
                  )}
                </td>
                <td>
                  <button
                    onClick={() => setSelectedTicket(ticket)}
                    className="btn btn-info"
                    data-bs-toggle="modal"
                    data-bs-target="#modalInfo2"
                    title="Más Info"
                  >
                    <i className="bi bi-info"></i>
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="11" className="text-center">
                No hay tickets resueltos en este momento.
              </td>
            </tr>
          )}
        </tbody>
      </table>
      <div
        className="modal fade"
        id="modalInfo2"
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
                    <p>{fecha}</p>
                  </div>

                  <div className="mb-3">
                    <label className="form-label text-decoration-underline">
                      Fecha Resuelto:{" "}
                    </label>
                    <p>{fechaResuelto}</p>
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
