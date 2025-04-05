import { supabase } from "../supabase/supabase";

export async function getTickets() {
  try {
    const { data, error } = await supabase.from("Tickets").select("*");

    if (error) throw error;

    return data;
  } catch (error) {
    console.error("Error al obtener los tickets:", error.message);
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
// Eliminar ticket
export async function eliminarTicket(idTicket) {
  try {
    const { data, error } = await supabase
      .from("Tickets")
      .delete()
      .eq("id", idTicket)
      .select();

    if (error) {
      console.error("Error al eliminar el ticket:", error);
      throw error;
    }

    return data;
  } catch (error) {
    console.error("Error al resolver el ticket:", error.message);
    throw error;
  }
}

export async function getCommentsUser(idTicket) {
  try {
    const { data, error } = await supabase
      .from("Comments")
      .select("*")
      .eq("ticketId", idTicket);

    if (error) throw error;

    return data;
  } catch (error) {
    console.error("Error al obtener comentarios:", error.message);
    return [];
  }
}

export async function crearComentario(data) {
  try {
    const { data: insertedData, error } = await supabase
      .from("Comments")
      .insert(data)
      .select();

    if (error) {
      console.error("Error de inserción:", error);
      throw error;
    }

    console.log("Datos insertados:", insertedData);
    return insertedData;
  } catch (error) {
    console.error("Error al crear comentario:", error.message);
    throw error;
  }
}
export async function updateTicket(data, idTicket) {
  try {
    const { data: updatedData, error } = await supabase
      .from("Tickets")
      .update(data)
      .eq("id", idTicket)
      .select(); //devuelve los datos actualizados

    if (error) {
      console.error("Error de update:", error);
      throw error;
    }

    console.log("Datos actualizados:", updatedData);
    return updatedData; // Retorna los datos actualizados
  } catch (error) {
    console.error("Error al actualizar el ticket:", error.message);
    throw error;
  }
}

export async function getUsers() {
  try {
    const { data, error } = await supabase.from("Users").select("*");

    if (error) throw error;

    return data;
  } catch (error) {
    console.error("Error al obtener los usuarios:", error.message);
    return [];
  }
}

export async function updateUser(data, userId) {
  try {
    const { data: updatedData, error } = await supabase
      .from("Users")
      .update(data)
      .eq("id", userId)
      .select();

    if (error) {
      console.error("Error de update:", error);
      throw error;
    }

    console.log("Datos actualizados:", updatedData);
    return updatedData; 
  } catch (error) {
    console.error("Error al actualizar el usuario:", error.message);
    throw error;
  }
}
