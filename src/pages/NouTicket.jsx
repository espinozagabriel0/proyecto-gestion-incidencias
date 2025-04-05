// import HeaderMenu from "../components/HeaderMenu";

import { useContext, useEffect, useState } from "react";
import { GestionContext } from "../context/GestionContext";
import { crearTicket, getTickets } from "../lib/utils";
import { supabase } from "../supabase/supabase";

export default function NouTicket() {
  const { setTiquetsTotal, usuarioActual, setTickets } =
    useContext(GestionContext);

  const [aula, setAula] = useState("");
  const [grupo, setGrupo] = useState("");
  const [ordenador, setOrdenador] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [alumno, setAlumno] = useState("");

  const fetchTickets = async () => {
    const updatedTickets = await getTickets();
    setTickets(updatedTickets);
  };

  const handleCrearTicket = async (e) => {
    e.preventDefault();
    if (!usuarioActual?.id) return;

    if (aula && grupo && ordenador && descripcion) {
      const newTicket = {
        aula: aula,
        grupo: grupo,
        ordenador: ordenador,
        descripcion: descripcion,
        alumno: usuarioActual?.role == "user" ? usuarioActual?.name : alumno,
        usuarioId: usuarioActual?.id,
      };

      try {
        const createdTicket = await crearTicket(newTicket);
        console.log("Ticket creado:", createdTicket);
        limpiarInputs();
      } catch (error) {
        console.error("Error al crear el ticket:", error);
      }
    }
  };

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
