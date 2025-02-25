import { Link } from "react-router-dom";
import { useState } from "react";

export default function HeaderMenu() {

  const [currentUsermail, setCurrentUsermail] = useState(JSON.parse(localStorage.getItem('usuari_actual')).email || 'admin@ejemplo.com')

  return (
      <header>
        <nav className="navbar navbar-light bg-light">
          <div className="container-fluid">
            <a className="navbar-brand">Gestión de incidencias FPLLEFIA</a>
            <div>
              <Link to={"/panel"} className="btn btn-secondary ms-2">PANEL</Link>
              <Link to={"/"} className="btn btn-secondary ms-2">LOGIN</Link>
              <Link to={"/register"} className="btn btn-secondary ms-2">REGISTRO</Link>
            </div>
            <div>
              <span>{currentUsermail}</span>
            </div>
          </div>
        </nav>
    </header>
   
  )
}
