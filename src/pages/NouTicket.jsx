// import HeaderMenu from "../components/HeaderMenu";

import { useContext, useState } from "react";
import { GestionContext } from "../context/GestionContext";
import { crearTicket } from "../lib/utils";

export default function NouTicket() {
  const { setTiquetsTotal, usuarioActual } = useContext(GestionContext);

  const [aula, setAula] = useState("");
  const [grupo, setGrupo] = useState("");
  const [ordenador, setOrdenador] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [alumno, setAlumno] = useState("");

  // const handleCrearTicket = (e) => {
  //   e.preventDefault();

  //   console.log(aula);

  //   if (aula && grupo && ordenador && descripcion && alumno) {
  //     const date = new Date();
  //     const formattedDate = date.toLocaleDateString();

  //     setTiquetsTotal((prevTiquets) => [
  //       ...prevTiquets,
  //       {
  //         id: prevTiquets.length + 1,
  //         fecha: formattedDate,
  //         // fecha_resuelto: "13/02/2025", --> por defecto no está esta propiedad, se cambia en ticketsPendents
  //         aula: aula,
  //         grupo: grupo,
  //         ordenador: ordenador,
  //         descripcion: descripcion,
  //         alumno: alumno,
  //         comments: [],
  //         resuelto: false,
  //         usuarioId: usuarioActual?.id,
  //       },
  //     ]);

  //     limpiarInputs();
  //   }
  // };
  const handleCrearTicket = async(e) => {
    e.preventDefault();

    console.log(usuarioActual)
    if (!usuarioActual?.id) return;


    console.log('DATOS: ', aula, grupo, ordenador, descripcion, alumno)
    if (aula && grupo && ordenador && descripcion) {
      const newTicket = {
        aula: aula,
        grupo: grupo,
        ordenador: ordenador,
        descripcion: descripcion,
        alumno: usuarioActual?.role == "user" ? usuarioActual?.name : alumno,
        usuarioId: usuarioActual?.id
      }

      console.log(newTicket)

      try {
        const createdTicket = await crearTicket(newTicket);
        console.log("Ticket creado:", createdTicket);
        limpiarInputs();

      } catch (error) {
        console.error("Error al crear el ticket:", error);
      }
    }
  };

  const limpiarInputs = () => {
    setAula("");
    setGrupo("");
    setOrdenador("");
    setDescripcion("");
    setAlumno("");
  };

  return (
    <>
      <div>
        <button
          type="button"
          className="btn p-0"
          data-bs-toggle="modal"
          data-bs-target="#ticketModal"
        >
          <i
            className="fa-solid fa-square-plus"
            style={{ color: "green", fontSize: "3rem" }}
          ></i>
        </button>

        <div
          className="modal fade"
          id="ticketModal"
          tabIndex="-1"
          aria-labelledby="ticketModalLabel"
          aria-hidden="true"
        >
          <div className="modal-dialog modal-lg">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="ticketModalLabel">
                  Crear Nuevo Ticket
                </h5>
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                ></button>
              </div>
              <div className="modal-body">
                <form id="ticketForm" onSubmit={handleCrearTicket}>
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
                    {usuarioActual?.role == "user" ? (
                      <input
                        type="text"
                        className="form-control"
                        id="alumno"
                        value={usuarioActual?.name}
                        // onChange={(e) => setAlumno(e.target.value)}
                        name="alumno"
                        placeholder="Introduce el nombre del alumno"
                        required
                        readOnly
                      />
                    ) : (
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
                    )}
                  </div>
                </form>
              </div>
              <div className="modal-footer">
                <button
                  type="btn"
                  className="btn btn-secondary"
                  data-bs-dismiss="modal"
                >
                  Cerrar
                </button>
                <button
                  type="submit"
                  form="ticketForm"
                  className="btn btn-primary"
                  data-bs-dismiss="modal"
                >
                  Crear Ticket
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
