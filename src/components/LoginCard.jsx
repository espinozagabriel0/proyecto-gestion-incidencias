import { useNavigate } from "react-router-dom";
import { GestionContext } from "../context/GestionContext";
import HeaderMenu from "./HeaderMenu";
import { useContext, useState } from "react";

export default function LoginCard() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { usuarios, setUsuarioActual, login } = useContext(GestionContext);
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    // Llamar a la función login del contexto
    const result = await login(email, password);

    if (result.error) {
      // console.error("Error de inicio de sesión:", result.error);
      setError("Error: " + result.error);
    } else {
      limpiarInputs();
      setUsuarioActual(result?.profile);
      navigate("/panel");
    }
  };

  const limpiarInputs = () => {
    setEmail("");
    setPassword("");
  };

  return (
    <>
      <HeaderMenu />
      <main className="container mt-5">
        <div className="pt-5">
          <h1 className="w-100 text-center">Login</h1>
          <form
            action=""
            onSubmit={handleLogin}
            className="form p-4 border shadow bordered mt-5 mx-auto"
            style={{ width: "400px" }}
          >
            {error && <p className="text-danger text-center">{error}</p>}
            <label htmlFor="email" className="mt-2 form-label">
              User:
            </label>
            <input
              type="email"
              id="email"
              onChange={(e) => setEmail(e.target.value)}
              className="form-control"
              placeholder="usuario@mail.com"
              value={email}
            />

            <label htmlFor="pass" className="mt-2 form-label">
              Contraseña:
            </label>
            <input
              type="password"
              id="pass"
              className="form-control"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            <button type="submit" className="mt-4 w-100 btn btn-primary">
              Entrar
            </button>
          </form>
        </div>
      </main>

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
              <textarea
                id="comentario"
                className="form-control"
                rows={3}
                defaultValue={"Este es un comentario sobre esta incidencia"}
              ></textarea>
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
    </>
  );
}
