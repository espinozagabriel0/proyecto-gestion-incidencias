import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";

export default function HeaderMenu() {
  // cargar email usuario actual si existe
  const [currentUsermail] = useState(localStorage.getItem('usuari_actual') ? JSON.parse(localStorage.getItem('usuari_actual'))?.email : 'Inicia sesión')
  
  const navigate = useNavigate()


  // funcion para desloggear
  const handleLogout = () => {
    localStorage.clear()
    // localStorage.removeItem('usuari_actual')
    navigate('/')
  }

  const isAdmin = JSON.parse(localStorage.getItem('usuari_actual'))?.rol == "admin"  
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
              <button onClick={() => handleLogout()} className="btn btn-danger ms-2">
                <i className="bi bi-box-arrow-right"></i>
              </button>
              {
                isAdmin && (
                  <Link to={"/adminUsers"} className="btn btn-secondary ms-2">
                    <i className="bi bi-person-fill-gear"></i>
                  </Link>
                )
              }
            </div>
          </div>
        </nav>
    </header>
   
  )
}
