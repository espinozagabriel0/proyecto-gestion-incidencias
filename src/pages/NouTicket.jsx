// import HeaderMenu from "../components/HeaderMenu";

export default function NouTicket() {
  return (
    <>
      <div> 
        <button
          type="button"
          className="btn p-0"
          data-bs-toggle="modal"
          data-bs-target="#ticketModal"
        >
          <i className="fa-solid fa-square-plus" style={{color: "green", fontSize: "3rem"}}></i>
        </button>

        <div className="modal fade" id="ticketModal" tabIndex="-1" aria-labelledby="ticketModalLabel" aria-hidden="true">
          <div className="modal-dialog modal-lg">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="ticketModalLabel">Crear Nuevo Ticket</h5>
                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
              </div>
              <div className="modal-body">
                <form>
                  <div className="mb-3">
                    <label htmlFor="fecha" className="form-label">Fecha</label>
                    <input type="date" className="form-control" id="fecha" name="fecha" required />
                  </div>

                  <div className="mb-3">
                    <label htmlFor="aula" className="form-label">Aula</label>
                    <input type="text" className="form-control" id="aula" name="aula" placeholder="Introduce el aula" required />
                  </div>

                  <div className="mb-3">
                    <label htmlFor="grupo" className="form-label">Grupo</label>
                    <input type="text" className="form-control" id="grupo" name="grupo" placeholder="Introduce el grupo" required />
                  </div>

                  <div className="mb-3">
                    <label htmlFor="ordenador" className="form-label">Ordenador</label>
                    <input type="text" className="form-control" id="ordenador" name="ordenador" placeholder="Introduce el ordenador" required />
                  </div>

                  <div className="mb-3">
                    <label htmlFor="descripcion" className="form-label">Descripción</label>
                    <textarea className="form-control" id="descripcion" name="descripcion" rows="4" placeholder="Describe el problema o situación..." required></textarea>
                  </div>

                  <div className="mb-3">
                    <label htmlFor="alumno" className="form-label">Alumno</label>
                    <input type="text" className="form-control" id="alumno" name="alumno" placeholder="Introduce el nombre del alumno" required />
                  </div>
                </form>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Cerrar</button>
                <button type="submit" className="btn btn-primary">Crear Ticket</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
