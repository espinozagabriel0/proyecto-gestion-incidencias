import { supabase } from "../supabase/supabase";

// export async function getTicketsUsuario(userId) {
//     try {
//       const { data, error } = await supabase
//         .from("Tickets")
//         .select("*")
//         .eq("usuarioId", userId);

//       if (error) throw error;

//       return data;
//     } catch (error) {
//       console.error("Error al obtener equipos:", error.message);
//       return [];
//     }
//   }

export async function getTickets() {
  try {
    const { data, error } = await supabase
      .from("Tickets")
      .select("*")

    if (error) throw error;

    return data;
  } catch (error) {
    console.error("Error al obtener equipos:", error.message);
    return [];
  }
}
