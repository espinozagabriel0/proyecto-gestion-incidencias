import { useContext } from "react";
import { GestionContext } from "../../context/GestionContext";
import { Link } from "react-router-dom";

export default function TicketsPendents({tickets}) {

  const {setTiquetsTotal} = useContext(GestionContext)

  // crea un nuevo array con tickets y si el id coincide, actualiza la propiedad resuelto, sino, se devuelve el ticket sin actualizar
  const handleResolve = (id) => {
    const date = new Date()
    const formattedDate = date.toLocaleDateString()
    
    setTiquetsTotal(prevTickets => prevTickets.map((ticket) => ticket.id == id ? 
      {...ticket, resuelto: true, fecha_resuelto: formattedDate} : ticket
    ))
  }

  const handleRemove = (id) => {
    // sobreescribe el array en localStorage sin el ticket seleccionado
    setTiquetsTotal(prevTickets => prevTickets.filter((ticket) => ticket.id !== id))
  }

  return (
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
        {tickets.map((ticket) => 
          <tr key={ticket.id}>
            <td>{ticket.id}</td>
            <td>{ticket.fecha}</td>
            <td>{ticket.aula}</td>
            <td>{ticket.grupo}</td>
            <td>{ticket.ordenador}</td>
            <td>{ticket.descripcion}</td>
            <td>{ticket.alumno}</td>
            <td>
              <button onClick={() => handleResolve(ticket.id)} className="btn btn-success me-1" title="Resolver ticket">
                Resolver
              </button>
              <button 
                className="btn btn-warning me-1" 
                title="Añadir comentario"
                data-bs-toggle="modal" 
                data-bs-target="#exampleModal"
              >
                <i className="bi bi-pencil"></i>
              </button>
              <button className="btn btn-info me-1" title="Ver comentarios">
                <Link to={`/comments/${ticket.id}`}>
                  <i className="bi bi-chat-left-text"></i>
                </Link>
              </button>
              <button onClick={() => handleRemove(ticket.id)} className="btn btn-danger" title="Eliminar ticket">
                <i className="bi bi-trash3"></i>
              </button>
            </td>
          </tr>
        
        )}
      </tbody>
    </table>
  );
}
