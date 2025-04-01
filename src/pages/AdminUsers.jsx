import { useContext, useState } from "react";
import HeaderMenu from "../components/HeaderMenu";
import { GestionContext } from "../context/GestionContext";
import { Navigate } from "react-router-dom";

export default function AdminUsers() {
  const { usuarios, setUsuarios, usuarioActual } = useContext(GestionContext);
  const [showModal, setShowModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [newRole, setNewRole] = useState("");

  const handleRoleChange = (user, role) => {
    setSelectedUser(user);
    setNewRole(role);
    setShowModal(true);
  };

  const handleConfirmChange = () => {
    if (selectedUser && newRole) {
      setUsuarios((prevUsuarios) =>
        prevUsuarios.map((user) =>
          user.id === selectedUser.id
            ? {
                ...user,
                rol: newRole,
              }
            : user
        )
      );
    }
    setShowModal(false);
  };

  if (usuarioActual?.rol !== "admin") {
    return <Navigate to={"/panel"}/>
  }

  return (
    <div>
      <HeaderMenu />
      <main className="container mt-5 d-flex gap-3 justify-content-between flex-wrap">
        {usuarios.map((usuario) => (
          <div
            key={usuario.id}
            className="border rounded-2 p-3 flex-grow-1 shadow"
          >
            <div className="d-flex justify-content-between align-items-center">
              <h5>{usuario.nombre}</h5>
            </div>

            <p>Rol:</p>
            <select
              className="form-select"
              defaultValue={usuario?.rol}
              onChange={(e) => handleRoleChange(usuario, e.target.value)}
            >
              <option value="user">User</option>
              <option value="admin">Admin</option>
              <option value="profesor">Profesor</option>
            </select>
          </div>
        ))}

        {showModal && (
          <>
            <div className="modal-backdrop fade show" style={{display: "block"}}></div>
            <div
              className="modal fade show"
              style={{ display: "block" }}
              tabIndex="-1"
              role="dialog"
              aria-labelledby="exampleModalCenterTitle"
              aria-hidden="true"
            >
              <div className="modal-dialog modal-dialog-centered" role="document">
                <div className="modal-content">
                  <div className="modal-header">
                    <h5 className="modal-title" id="exampleModalLongTitle">
                      Confirmar cambio de rol
                    </h5>
                    <button
                      type="button"
                      className="btn-close"
                      onClick={() => setShowModal(false)}
                      aria-label="Close"
                    ></button>
                  </div>
                  <div className="modal-body">
                    Se aplicarán estos cambios para el usuario {selectedUser?.nombre}: Rol {selectedUser?.rol} {'->'} {newRole}
                  </div>
                  <div className="modal-footer">
                    <button
                      type="button"
                      className="btn btn-secondary"
                      onClick={() => setShowModal(false)}
                    >
                      Cancelar
                    </button>
                    <button
                      type="button"
                      className="btn btn-primary"
                      onClick={handleConfirmChange}
                    >
                      Confirmar cambios
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </>
        )}
      </main>
    </div>
  );
}
