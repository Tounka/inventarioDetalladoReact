import styled from "styled-components"
import { Ticket } from "./ComponentesTickets";
import { useEmpleados } from "../ContextoGeneral";
import { useEffect } from "react";
const ContenedorPaginaTickets = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    
    
`;

const ContenedorDia = styled.div`
    width: 100%;
    height: auto;

    gap: 20px;
    display: grid;

`;

const ContenedorTicketStyled = styled.div`
    width: 100%;
    height: auto;

    display: grid;
    grid-template-columns: repeat(5, 1fr);
    gap: 20px;

`;

export const PaginaTicketsExtrasUx = () => {
    const { tickets } = useEmpleados();
    const keys = Object.keys(tickets);
    const arregloDias = Object.values(tickets);

    return (
        <ContenedorPaginaTickets>
            {keys.length > 0 ? (
                arregloDias.map((dia, diaIndex) => (
                    <ContenedorDia key={`dia-${diaIndex}`}>
                        {dia.tickets && Array.isArray(dia.tickets) && dia.tickets.length > 0 ? (
                            <ContenedorTicketStyled>
                                 {dia.tickets.map((ticket, ticketIndex) => (
                                <Ticket key={`ticket-${ticketIndex}`} 
                                    pos={ticket.pos}  
                                    empleado={ticket.empleado.nombre + ' ' + ticket.empleado.apodo}
                                    extras={Object.entries(ticket.extras)}
                                    fechaInicio={ticket.fechaInicio.seconds}
                                     /> 
                                ))}
                            </ContenedorTicketStyled>
                           
                        ) : (
                            <div>No hay tickets para este día.</div>
                        )}
                    </ContenedorDia>
                ))
            ) : (
                <div>No se encontraron tickets.</div>
            )}
        </ContenedorPaginaTickets>
    );
};