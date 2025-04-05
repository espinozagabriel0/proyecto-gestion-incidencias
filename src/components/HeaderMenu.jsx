import { Link, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { GestionContext } from "../context/GestionContext";

export default function HeaderMenu() {
  // cargar email usuario actual si existe
  const { usuarioActual, setUsuarioActual, signOut } =
    useContext(GestionContext);

  const navigate = useNavigate();

  // funcion para desloggear
  // const handleLogout = () => {
  //   // localStorage.clear()
  //   localStorage.removeItem('usuari_actual')
  //   setUsuarioActual(null)
  //   navigate('/')
  // }
  const handleLogout = async () => {
    // localStorage.clear()
    await signOut();
    navigate("/");
  };

  const isAdmin = usuarioActual?.role === "admin";
  return (
    <header>
      <nav className="navbar navbar-light bg-light">
        <div className="container-fluid">
          <a className="navbar-brand">Gestión de incidencias FPLLEFIA</a>
          <div>
            <Link to={"/panel"} className="btn btn-secondary ms-2">
              PANEL
            </Link>
            <Link to={"/"} className="btn btn-secondary ms-2">
              LOGIN
            </Link>
            <Link to={"/register"} className="btn btn-secondary ms-2">
              REGISTRO
            </Link>
          </div>
          <div className="d-flex align-items-center">
            <div className="user-info me-2">
              {usuarioActual && (
                <p className="mb-0 fw-bold">
                  {usuarioActual?.name}
                  <span style={{ fontSize: ".85rem" }} className="text-secondary">
                    {" "}
                    ({usuarioActual?.role})
                  </span>
                </p>
              )}
              <span className="text-muted">
                {usuarioActual?.email || "Inicia sesión"}
              </span>
            </div>
            {usuarioActual && (
              <button
                onClick={() => handleLogout()}
                className="btn btn-danger btn-sm ms-2"
              >
                <i className="bi bi-box-arrow-right"></i>
              </button>
            )}
            {isAdmin && (
              <Link
                to={"/adminUsers"}
                className="btn btn-secondary btn-sm ms-2"
              >
                <i className="bi bi-person-fill-gear"></i>
              </Link>
            )}
          </div>
        </div>
      </nav>
    </header>
  );
}
