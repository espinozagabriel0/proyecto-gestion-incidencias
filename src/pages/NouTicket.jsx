import HeaderMenu from "../components/HeaderMenu";

export default function NouTicket() {
  return (
    <>
      <HeaderMenu/>
      <main className="container mt-5">
      <form >
        {/* <div className="mb-3">
          <label htmlFor="codigo" className="form-label">Código</label>
          <input type="text" className="form-control" id="codigo" name="codigo" placeholder="Introduce el código" required />
        </div> */}

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

        <button type="submit" className="btn btn-primary w-100">Crear Ticket</button>
      </form>
      </main>
    </>
  )
}
