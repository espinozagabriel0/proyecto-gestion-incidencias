import { useContext } from "react";
import HeaderMenu from "../components/HeaderMenu";
import { GestionContext } from "../context/GestionContext";

export default function AdminUsers() {
  const { usuarios, setUsuarios } = useContext(GestionContext);
  console.log(usuarios);

  const handleRoleChange = (id, newRole) => {
    console.log(newRole);

    // Actualizar el rol del usuario por su id 
    setUsuarios((prevUsuarios) =>
      prevUsuarios.map((user) => (user.id == id ? {
        ...user,
        rol: newRole
      } : user))
    );
  };

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
              onChange={(e) => handleRoleChange(usuario.id, e.target.value)}
            >
              <option value="user">User</option>
              <option value="admin">Admin</option>
              <option value="profesor">Profesor</option>
            </select>
          </div>
        ))}
      </main>
    </div>
  );
}
