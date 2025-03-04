import { Link } from "react-router-dom";
import HeaderMenu from "./HeaderMenu";
import Comment from "./Comment";

export default function Comments() {
  return (
    <>
      <HeaderMenu />
      <main className="container mt-5">
        <div className="d-flex">
          <h1>Comentarios</h1>
          <button className="btn btn-link ms-auto">
            <Link to={"/panel"}>&lt; Volver</Link>
          </button>
        </div>

        <h2 className="my-4">
          Código ticket: <span>123456</span>
        </h2>
        <div className="">
          <form action="" className="form card p-3 shadow">
            <label htmlFor="comentario" className="form-label">
              Comentario:{" "}
            </label>
            <textarea className="form-control" cols="3"></textarea>
            <label htmlFor="fecha" className="form-label me-2 mt-3">
              Fecha:{" "}
            </label>
            <div className="d-flex align-items-center">
              <input type="datetime-local" className="form-control w-25" />
              <button className="btn btn-success ms-auto">
                Añadir comentario
              </button>
            </div>
          </form>

          {/* Comentarios */}
          <div className="mt-4">
            <Comment />
            <Comment />
          </div>
        </div>

        {/* Modal */}
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
                <p>
                  Código incidencia: <span>123546</span>
                </p>
                <label htmlFor="comentario" className="form-label">
                  Comentario:
                </label>
                <input
                  className="form-control"
                  defaultValue="Estee es un comentario sobre esta incidencia"
                />
                <p className="small text-end">
                  Autor: <span>Pepe Loco</span>
                </p>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  data-bs-dismiss="modal"
                >
                  Cancelar
                </button>
                <button type="button" className="btn btn-primary">
                  Guardar cambios
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
