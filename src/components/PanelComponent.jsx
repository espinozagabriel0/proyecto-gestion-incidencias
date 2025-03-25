import { useContext } from "react";
import HeaderMenu from "./HeaderMenu";
import TicketsPendents from "./tables/TicketsPendents";
import TicketsResolts from "./tables/TicketsResolts";
import { GestionContext } from "../context/GestionContext";
import { Navigate } from "react-router-dom";
import NouTicket from "../pages/NouTicket";

export default function PanelComponent() {
  // obtener array dadesTiquets y filtrar por propiedad resuelto
  const { tiquetsTotal, usuarioActual } = useContext(GestionContext);

  const ticketsPendientes = tiquetsTotal.filter((ticket) => !ticket.resuelto);

  const ticketsResueltos = tiquetsTotal.filter((ticket) => ticket.resuelto);

  if (!usuarioActual) {
    return <Navigate to={"/"} />;
  }

  console.log(usuarioActual)

  return (
    <>
      <HeaderMenu />
      <main className="container mt-5">
        <div className="d-flex align-items-center justify-content-between">
          <h1>Administración de incidencias</h1>
          {["admin", "user"].includes(usuarioActual?.rol) && <NouTicket />}
        </div>
        <h2 className="mt-5">Tickets pendientes</h2>
        <TicketsPendents tickets={ticketsPendientes} />

        <h2 className="mt-5">Tickets resueltos</h2>
        <TicketsResolts tickets={ticketsResueltos} />
      </main>
    </>
  );
}
