export default function TicketsPendents({tickets}) {
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
              <button className="btn btn-success me-1" title="Resolver ticket">
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
                <i className="bi bi-chat-left-text"></i>
              </button>
              <button className="btn btn-danger" title="Eliminar ticket">
                <i className="bi bi-trash3"></i>
              </button>
            </td>
          </tr>
        
        )}
      </tbody>
    </table>
  );
}
