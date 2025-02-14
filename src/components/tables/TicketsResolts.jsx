
export default function TicketsResolts({tickets}) {
  return (
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
                    <button className="btn btn-info" title="Ver comentarios">
                        <i className="bi bi-chat-left-text"></i>
                    </button>
                    </td>
                    <td>
                    <button className="btn btn-danger" title="Eliminar ticket">
                        <i className="bi bi-trash3"></i>
                    </button>
                </td>
            </tr>
          
          )}
        </tbody>
    </table>
  )
}
