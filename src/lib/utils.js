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
    const { data, error } = await supabase.from("Tickets").select("*");

    if (error) throw error;

    return data;
  } catch (error) {
    console.error("Error al obtener equipos:", error.message);
    return [];
  }
}
// Crear ticket
export async function crearTicket(data) {
  try {
    const { data: insertedData, error } = await supabase
      .from("Tickets")
      .insert(data)
      .select();

    if (error) {
      console.error("Error de inserción:", error);
      throw error;
    }

    console.log("Datos insertados:", insertedData);
    return insertedData;
  } catch (error) {
    console.error("Error al crear ticket:", error.message);
    throw error;
  }
}
// Resolver Ticket
export async function resolverTicket(idTicket) {
  try {
    const now = new Date();
    const utcTimestamp = now.toISOString().replace("Z", "+00");

    const { data, error } = await supabase
      .from("Tickets")
      .update({ resuelto: true, date_solved: utcTimestamp })
      .eq("id", idTicket)
      .select();

    if (error) {
      console.error("Error al resolver el ticket:", error);
      throw error;
    }

    console.log("Ticket resuelto:", data[0]);
    return data[0];
  } catch (error) {
    console.error("Error al resolver el ticket:", error.message);
    throw error;
  }
}
