import { Link } from "react-router-dom";

export default function Header() {
  return (
    <nav className="navbar navbar-expand-lg bg-body-tertiary p-2">
      <div className="container-fluid">
        <div className="d-flex justify-content-between align-items-center w-100">
          <div>
            <a className="navbar-brand" href="#">Gestión de Incidencias FPLLEFIA</a>
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
              <span className="navbar-toggler-icon"></span>
            </button>
          </div>
          <div className="collapse navbar-collapse justify-content-center" id="navbarNav">
            <div className="navbar-nav d-flex gap-3">
              <Link to={"/panel"} className="p-2 rounded bg-dark text-white">
                PANEL
              </Link>
              <Link to={"/"} className="p-2 rounded bg-dark text-white">
                LOGIN
              </Link>
              <Link to={"/register"} className="p-2 rounded bg-dark text-white">
                REGISTRO
              </Link>
            </div>
          </div>
          <p className="mb-0">correoejemplo@fpllefia.com</p>
        </div>
      </div>
    </nav>
  )
}
