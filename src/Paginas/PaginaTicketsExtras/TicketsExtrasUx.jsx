import styled from "styled-components";
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
    grid-template-columns: repeat(auto-fill, minmax(250px, 250px));
    justify-content: center;
    gap: 20px;
`;

const DiaTxt = styled.h3`
    font-size: 36px;
    user-select: none;
    margin: 20px;
    display: flex;
    justify-content: center;
    color: #FFBC0D;
`;

// Función para calcular la diferencia entre dos objetos de extras
const calcularDiferenciaExtras = (extrasActual, extrasAnterior) => {
    const diferencia = {};

    // Unir todas las claves de ambos objetos
    const claves = new Set([...Object.keys(extrasActual), ...Object.keys(extrasAnterior)]);

    claves.forEach(clave => {
        const valorActual = extrasActual[clave] || 0;
        const valorAnterior = extrasAnterior[clave] || 0;

        if (valorActual !== valorAnterior) {
            diferencia[clave] = valorActual - valorAnterior;
        }
    });

    return diferencia;
};

export const PaginaTicketsExtrasUx = () => {
    const { tickets } = useEmpleados();
    const keys = Object.keys(tickets);
    const arregloDias = Object.values(tickets);

    console.log('asdasda', arregloDias);

    const convertTimestampToDate = (seconds, nanoseconds, opc) => {
        const milliseconds = (seconds * 1000) + (nanoseconds / 1000000);
        const date = new Date(milliseconds);

        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0'); // Los meses en JavaScript van de 0 a 11
        const day = String(date.getDate()).padStart(2, '0');
        const hours = String(date.getHours()).padStart(2, '0');
        const minutes = String(date.getMinutes()).padStart(2, '0');

        if (opc === 'dia') {
            return `${year}-${month}-${day}`;
        } else if (opc === 'hora') {
            return `${hours}:${minutes}`;
        }
        // Devuelve una combinación si 'opc' no es especificado
    };

    return (
        <ContenedorPaginaTickets>
            {keys.length > 0 ? (
                arregloDias.map((dia, diaIndex) => (
                    <ContenedorDia key={`dia-${diaIndex}`}>
                        <DiaTxt>{convertTimestampToDate(dia.fecha.seconds, dia.fecha.nanoseconds, 'dia')}</DiaTxt>
                        {dia.tickets && Array.isArray(dia.tickets) && dia.tickets.length > 0 ? (
                            <ContenedorTicketStyled>
                                {dia.tickets
                                    .sort((a, b) => {
                                        // Primero ordena por .pos
                                        if (a.pos !== b.pos) {
                                            return a.pos - b.pos;
                                        }
                                        // Si .pos es igual, entonces ordena por .fechaInicio
                                        return new Date(a.fechaInicio.seconds * 1000 + a.fechaInicio.nanoseconds / 1000000) -
                                            new Date(b.fechaInicio.seconds * 1000 + b.fechaInicio.nanoseconds / 1000000);
                                    })
                                    .map((ticket, ticketIndex, ticketsArray) => {
                                        // Encuentra el ticket anterior con la misma posición
                                        const ticketAnterior = ticketsArray
                                            .slice(0, ticketIndex)
                                            .reverse()
                                            .find(t => t.pos === ticket.pos);

                                        const diferenciaExtras = ticketAnterior
                                            ? calcularDiferenciaExtras(ticket.extras, ticketAnterior.extras)
                                            : ticket.extras; // Si no hay ticket anterior, muestra los extras actuales

                                        return (
                                            <Ticket key={`ticket-${ticketIndex}`}
                                                pos={ticket.pos}
                                                empleado={`${ticket.empleado.nombre} ${ticket.empleado.apodo}`}
                                                extras={Object.entries(diferenciaExtras)}
                                                fechaInicio={convertTimestampToDate(ticket.fechaInicio.seconds, ticket.fechaInicio.nanoseconds, 'hora')}
                                                fechaFinal={convertTimestampToDate(ticket.fechaFinal.seconds, ticket.fechaFinal.nanoseconds, 'hora')}
                                            />
                                        );
                                    })}
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
