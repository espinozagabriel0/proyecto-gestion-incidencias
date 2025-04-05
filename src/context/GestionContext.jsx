import { createContext, useState, useEffect } from "react";
import { supabase } from "../supabase/supabase";
const GestionContext = createContext();

const GestionProvider = ({ children }) => {
  // const [session, setSession] = useState(null)
  const [usuarioActual, setUsuarioActual] = useState(() => {
    const storedUser = localStorage.getItem("usuari_actual");
    return storedUser ? JSON.parse(storedUser) : null;
  });

  const saveUserToLocalStorage = (userData) => {
    localStorage.setItem("usuari_actual", JSON.stringify(userData));
    setUsuarioActual(userData);
  };

  const clearUserFromLocalStorage = () => {
    localStorage.removeItem("usuari_actual");
    setUsuarioActual(null);
  };

  useEffect(() => {
    const getUserData = async (session) => {
      if (session?.user) {
        // Obtener datos de la tabla Users
        const { data: userData, error: userError } = await supabase
          .from("Users")
          .select("*")
          .eq("user_id", session.user.id)
          .single();

        if (userError) {
          console.error("Error obteniendo datos de Users:", userError);
          clearUserFromLocalStorage();
        } else {
          // Combinar datos de autenticación con los datos del perfil en Users
          const combinedUserData = {
            user: session.user,
            profile: userData,
          };
          saveUserToLocalStorage(combinedUserData?.profile);
        }
      } else {
        clearUserFromLocalStorage();
      }
    };

    supabase.auth.getSession().then(({ data: { session } }) => {
      getUserData(session);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      getUserData(session);
    });

    return () => subscription.unsubscribe();
  }, []);

  const login = async (email, password) => {
    // Paso 1: Autenticación con Supabase Auth
    const { data: authData, error: authError } =
      await supabase.auth.signInWithPassword({ email, password });

    if (authError) return { error: authError.message };

    // Paso 2: Obtener datos de la tabla Users
    const { data: userData, error: userError } = await supabase
      .from("Users")
      .select("*")
      .eq("user_id", authData.user.id)
      .single();

    if (userError) return { error: "Perfil de usuario no encontrado" };

    // Devolver ambos datos
    return {
      user: authData.user,
      profile: userData,
    };
  };

  const register = async (email, password, name) => {
    // Intentar registrar al usuario en Supabase Auth
    const { data: authData, error: authError } = await supabase.auth.signUp({
      email,
      password,
    });
    if (authError) {
      return { success: false, error: authError.message };
    }

    // Insertar el nuevo usuario en la tabla 'Users'
    const { data: userData, error: userError } = await supabase
      .from("Users")
      .insert([
        {
          role: "user",
          name: name,
          user_id: authData.user.id,
          email: email,
        },
      ]);

    if (userError) {
      await supabase.auth.admin.deleteUser(authData.user.id);
      return { success: false, error: userError.message };
    }
    await supabase.auth.signOut(); // cerrar sesión después de registrar exitosamente, para que el usuario inicie sesión con su email y password
    return { success: true, data: userData };
  };

  const signOut = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) {
        console.warn("Error al cerrar sesión:", error.message);
      }
    } catch (err) {
      console.error("Error inesperado al cerrar sesión:", err);
    } finally {
      // Limpiar el estado local independientemente del resultado
      await supabase.auth.refreshSession(); // refrescar sesión por si el signout falla
      localStorage.removeItem("usuari_actual");
      setUsuarioActual(null);
    }
  };

  const [tiquetsTotal, setTiquetsTotal] = useState(() => {
    const storedTiquets = localStorage.getItem("dades_tiquets");
    return storedTiquets
      ? JSON.parse(storedTiquets)
      : [
          {
            id: 1,
            fecha: "12/02/2025",
            aula: "A201",
            grupo: "DAW1",
            ordenador: "PC5",
            descripcion: "No arranca el sistema operativo",
            alumno: "Ana García",
            comments: [],
            resuelto: false,
            usuarioId: 1,
          },
          {
            id: 2,
            fecha: "13/02/2025",
            aula: "B102",
            grupo: "DAW2",
            ordenador: "PC12",
            descripcion: "Problemas con la conexión a internet",
            alumno: "Juan Martínez",
            comments: [],
            resuelto: false,
            usuarioId: 4,
          },
          {
            id: 3,
            fecha: "14/02/2025",
            aula: "C305",
            grupo: "ASIR",
            ordenador: "PC8",
            descripcion: "Error en la instalación de software",
            alumno: "María López",
            comments: [],
            resuelto: false,
            usuarioId: 3,
          },
          {
            id: 4,
            fecha: "14/02/2025",
            aula: "D401",
            grupo: "SMR",
            ordenador: "PC3",
            descripcion: "Pantalla azul recurrente",
            alumno: "Juan Martínez",
            comments: [],
            resuelto: false,
            usuarioId: 4,
          },
          {
            id: 5,
            fecha: "14/02/2025",
            aula: "A103",
            grupo: "DAW1",
            ordenador: "PC15",
            descripcion: "Teclado no responde",
            alumno: "Ana García",
            comments: [],
            resuelto: false,
            usuarioId: 1,
          },
          {
            id: 6,
            fecha: "10/02/2025",
            fecha_resuelto: "11/02/2025",
            aula: "B205",
            grupo: "DAW2",
            ordenador: "PC7",
            descripcion: "Problema con el software de diseño",
            alumno: "María López",
            comments: [],
            resuelto: true,
            usuarioId: 3,
          },
          {
            id: 7,
            fecha: "11/02/2025",
            fecha_resuelto: "12/02/2025",
            aula: "C103",
            grupo: "ASIR",
            ordenador: "PC10",
            descripcion: "Fallo en la configuración de red",
            alumno: "Ana García",
            comments: [],
            resuelto: true,
            usuarioId: 1,
          },
          {
            id: 8,
            fecha: "12/02/2025",
            fecha_resuelto: "13/02/2025",
            aula: "A301",
            grupo: "SMR",
            ordenador: "PC2",
            descripcion: "Problema con el arranque dual",
            alumno: "Juan Martínez",
            comments: [],
            resuelto: true,
            usuarioId: 4,
          },
          {
            id: 9,
            fecha: "13/02/2025",
            fecha_resuelto: "14/02/2025",
            aula: "D102",
            grupo: "DAW1",
            ordenador: "PC9",
            descripcion: "Error en la compilación de código",
            alumno: "María López",
            comments: [],
            resuelto: true,
            usuarioId: 3,
          },
          {
            id: 10,
            fecha: "14/02/2025",
            fecha_resuelto: "14/02/2025",
            aula: "B104",
            grupo: "DAW2",
            ordenador: "PC11",
            descripcion: "Problema con el entorno de desarrollo",
            alumno: "Juan Martínez",
            comments: [],
            resuelto: true,
            usuarioId: 4,
          },
        ];
  });

  // const [usuarios, setUsuarios] = useState(() => {
  //   const storedUsuarios = localStorage.getItem("dades_usuaris");
  //   return storedUsuarios
  //     ? JSON.parse(storedUsuarios)
  //     : [
  //         {
  //           rol: "user",
  //           nombre: "Ana García",
  //           id: 1,
  //           email: "ana.garcia@ejemplo.com",
  //           password: "Us3r2025#",
  //         },
  //         {
  //           rol: "admin",
  //           nombre: "Gabriel Bascope",
  //           id: 2,
  //           email: "gabriel.bascope@ejemplo.com",
  //           password: "Adm1n2025!",
  //         },
  //         {
  //           rol: "user",
  //           nombre: "María López",
  //           id: 3,
  //           email: "maria.lopez@ejemplo.com",
  //           password: "Ed1tor2025$",
  //         },
  //         {
  //           rol: "user",
  //           nombre: "Juan Martínez",
  //           id: 4,
  //           email: "juan.martinez@ejemplo.com",
  //           password: "Us3r2025%",
  //         },
  //         {
  //           rol: "profesor",
  //           nombre: "Laura Sánchez",
  //           id: 5,
  //           email: "laura.sanchez@ejemplo.com",
  //           password: "M0d2025&",
  //         },
  //       ];
  // });

  const [tickets, setTickets] = useState(null);
  const [usuarios, setUsuarios] = useState(null);

  useEffect(() => {
    localStorage.setItem("dades_tiquets", JSON.stringify(tiquetsTotal));
    localStorage.setItem("dades_usuaris", JSON.stringify(usuarios));
    localStorage.setItem("usuari_actual", JSON.stringify(usuarioActual));
  }, [tiquetsTotal, usuarios, usuarioActual]);

  return (
    <GestionContext.Provider
      value={{
        tiquetsTotal,
        setTiquetsTotal,
        usuarios,
        setUsuarios,
        usuarioActual,
        setUsuarioActual,
        register,
        login,
        signOut,
        tickets,
        setTickets,
      }}
    >
      {children}
    </GestionContext.Provider>
  );
};

export { GestionContext, GestionProvider };
