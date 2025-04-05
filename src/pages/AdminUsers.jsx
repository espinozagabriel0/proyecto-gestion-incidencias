import { useContext, useEffect, useState } from "react";
import HeaderMenu from "../components/HeaderMenu";
import { GestionContext } from "../context/GestionContext";
import { Navigate } from "react-router-dom";
import { getUsers, updateUser } from "../lib/utils";
import { supabase } from "../supabase/supabase";

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

  const handleConfirmChange = async () => {
    if (selectedUser && newRole) {
      try {
        const updatedData = {role: newRole};

        const updatedTicket = await updateUser(updatedData, selectedUser?.id); 
        console.log("usuario actualizado:", updatedTicket);
  
      } catch (error) {
        console.error("Error al actualizar el rol del usuario:", error.message);
      }
    }else{
      console.error('No se ha podido actualizar el usuario')
    }
    setShowModal(false);
  };

  const fetchUsers = async () => {
    try {
      const usersData = await getUsers();  
      setUsuarios(usersData); 

      console.log("Usuarios obtenidos:", usersData); 
    } catch (error) {
      console.error("Error al obtener los usuarios:", error.message);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

    useEffect(() => {
      const changes = supabase
        .channel("schema-db-changes")
        .on(
          "postgres_changes",
          {
            schema: "public",
            event: "*",
            table: "Users",
          },
          (payload) => {
            fetchUsers()
          }
        )
        .subscribe();
  
      return () => {
        changes.unsubscribe();
      };
    }, []);


  if (usuarioActual?.role !== "admin") {
    return <Navigate to={"/panel"} />;
  }

  return (
    <div>
      <HeaderMenu />
      <main className="container mt-5 d-flex gap-3 justify-content-between flex-wrap">
        {usuarios && usuarios.map((usuario) => (
          <div
            key={usuario.id}
            className="border rounded-2 p-3 flex-grow-1 shadow"
          >
            <div className="d-flex justify-content-between align-items-center">
              <h5>{usuario?.name}</h5>
            </div>

            <p>Rol:</p>
            <select
              className="form-select"
              defaultValue={usuario?.role}
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
            <div
              className="modal-backdrop fade show"
              style={{ display: "block" }}
            ></div>
            <div
              className="modal fade show"
              style={{ display: "block" }}
              tabIndex="-1"
              role="dialog"
              aria-labelledby="exampleModalCenterTitle"
              aria-hidden="true"
            >
              <div
                className="modal-dialog modal-dialog-centered"
                role="document"
              >
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
                    Se aplicarán estos cambios para el usuario{" "}
                    {selectedUser?.nombre}: Rol {selectedUser?.role} {"->"}{" "}
                    {newRole}
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
