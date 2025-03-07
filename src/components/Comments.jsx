import { Link } from "react-router-dom";
import HeaderMenu from "./HeaderMenu";
import Comment from "./Comment";
import { useContext, useEffect, useState } from "react";
import { GestionContext } from "../context/GestionContext";

export default function Comments({ id }) {
  const { tiquetsTotal, setTiquetsTotal } = useContext(GestionContext);

  // Al cargar componente, cargar comentarios de este ticket
  const [comentarios, setComentarios] = useState(tiquetsTotal.filter((tiquet) => tiquet.id == id)[0].comments || []);

  const usuarioActual = JSON.parse(
    localStorage.getItem("usuari_actual")
  ).nombre;

  const [commentBody, setCommentBody] = useState("");
  // const [commentDate, setCommentDate] = useState(new Date());

  useEffect(() => {
    console.log(comentarios);
  }, []);

  const handleAddComment = (e) => {
    // Comprobar que estan todos los campos y de forma correcta, y guardar este comentario al array 'comments' del ticket seleccionado en localstorage
    e.preventDefault();

    if (usuarioActual.length > 0) {
      if (commentBody.length > 0) {
        const date = new Date()
        const formattedDate = date.toLocaleDateString()

        const modifiedComments = [
          ...comentarios,
          {
            //
            id: comentarios.length++,
            Author: usuarioActual,
            Date: formattedDate,
            CommentBody: commentBody,
          },
        ];
        // Se cambia el state de comentarios (local) y el tiquetsTotal(global) para sincronizarlo
        setComentarios(modifiedComments);
        setTiquetsTotal((prevTickets) =>
          prevTickets.map((ticket) =>
            ticket.id == id
              ? {
                  ...ticket,
                  comments: modifiedComments,
                }
              : ticket
          )
        );

        setCommentBody("")
        // setCommentDate(new Date())
      }
    } else {
      console.error("Inicia sesión para poder añadir comentarios.");
    }
  };

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
          Código ticket: <span>{id}</span>
        </h2>
        <div className="">
          <form
            action=""
            className="form card p-3 shadow"
            onSubmit={handleAddComment}
          >
            <label htmlFor="comentario" className="form-label">
              Comentario:{" "}
            </label>
            <textarea
              value={commentBody}
              className="form-control"
              cols="3"
              onChange={(e) => setCommentBody(e.target.value)}
            ></textarea>
            {/* <label htmlFor="fecha" className="form-label me-2 mt-3">
              Fecha:{" "}
            </label> */}
            <div className="d-flex align-items-center">
              {/* <input
                value={commentDate}
                type="datetime-local"
                className="form-control w-25"
                onChange={(e) => setCommentDate(e.target.value)}
              /> */}
              <button className="btn btn-success ms-auto">
                Añadir comentario
              </button>
            </div>
          </form>

          {/* Comentarios, que se cargaran del array comentario en localstorage que tenga el id del ticket seleccionado*/}
          <div className="mt-4">
            {comentarios.length > 0 ? (
              comentarios.map((comentario) => (
                <Comment
                  key={comentario.id}
                  author={comentario.Author}
                  date={comentario.Date}
                  body={comentario.CommentBody}
                />
              ))
            ) : (
              <p>Todavía no hay comentarios.</p>
            )}
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
