import { Link, Navigate } from "react-router-dom";
import HeaderMenu from "./HeaderMenu";
import Comment from "./Comment";
import { useContext, useEffect, useState } from "react";
import { GestionContext } from "../context/GestionContext";
import { crearComentario, getCommentsUser } from "../lib/utils";
import { es } from "date-fns/locale";
import { format } from "date-fns";

export default function Comments({ id }) {
  
  const { tiquetsTotal, setTiquetsTotal, usuarioActual} = useContext(GestionContext);

  // Al cargar componente, cargar comentarios de este ticket
  // const [comentarios, setComentarios] = useState(tiquetsTotal.filter((tiquet) => tiquet.id == id)[0].comments || []);

  // const usuarioActual = JSON.parse(
  //   localStorage.getItem("usuari_actual")
  // )?.nombre;

  const [comentarios, setComentarios] = useState(null)

  const [commentBody, setCommentBody] = useState("");
  // const [commentDate, setCommentDate] = useState(new Date());

  useEffect(() => {
    const getComments = async () => {
      try {
        const data = await getCommentsUser(id);
        setComentarios(data)
      } catch (error) {
        console.error("Error al obtener comentarios:", error.message);
      }
    }
    getComments()
  }, []);
  console.log(comentarios);
  // const handleAddComment = (e) => {
  //   // Comprobar que estan todos los campos y de forma correcta, y guardar este comentario al array 'comments' del ticket seleccionado en localstorage
  //   e.preventDefault();

  //   if (usuarioActual) {
  //     if (commentBody.length > 0) {
  //       const date = new Date()
  //       const formattedDate = date.toLocaleDateString()

  //       const modifiedComments = [
  //         ...comentarios,
  //         {
  //           //
  //           id: comentarios.length++,
  //           Author: usuarioActual?.nombre,
  //           Date: formattedDate,
  //           CommentBody: commentBody,
  //         },
  //       ];
  //       // Se cambia el state de comentarios (local) y el tiquetsTotal(global) para sincronizarlo
  //       setComentarios(modifiedComments);
  //       setTiquetsTotal((prevTickets) =>
  //         prevTickets.map((ticket) =>
  //           ticket.id == id
  //             ? {
  //                 ...ticket,
  //                 comments: modifiedComments,
  //               }
  //             : ticket
  //         )
  //       );

  //       setCommentBody("")
  //       // setCommentDate(new Date())
  //     }
  //   } else {
  //     console.error("Inicia sesión para poder añadir comentarios.");
  //   }
  // };

  const handleAddComment = async (e) => {
    // Comprobar que estan todos los campos y de forma correcta, y guardar este comentario al array 'comments' del ticket seleccionado en localstorage
    e.preventDefault();
    if (commentBody.length == 0) return
    try {
      const data = {comment: commentBody, ticketId: id, userId: usuarioActual?.id, user_name: usuarioActual?.name}
      const createdComment = await crearComentario(data)

      setCommentBody("")
      console.log('Comentario creado:', createdComment)
    } catch (error) {
      console.error("Error al añadir comentario:", error.message);
    }

  };

  if (!usuarioActual) {
    return <Navigate to={"/"}/>
  }

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
              <button className="btn btn-success ms-auto mt-3">
                Añadir comentario
              </button>
            </div>
          </form>

          {/* Comentarios, que se cargaran del array comentario en localstorage que tenga el id del ticket seleccionado*/}
          <div className="mt-4">
            {comentarios && comentarios.length > 0 ? (
              comentarios.map((comentario) => (
                <Comment
                  key={comentario?.id}
                  author={comentario?.user_name}
                  date={comentario?.created_at && format(comentario?.created_at, 'dd/MM/yyyy HH:mm:ss', {locale: es})}
                  body={comentario?.comment}
                />
              ))
            ) : (
              <p className="text-center">Todavía no hay comentarios para este ticket.</p>
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
