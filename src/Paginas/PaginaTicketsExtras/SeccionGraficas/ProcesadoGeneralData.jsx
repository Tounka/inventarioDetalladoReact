// Función para procesar los tickets

export const procesarTickets = (dias) => {
    
    const calcularDiferenciaExtras = (extrasActual, extrasAnterior) => {
        const diferencia = {};
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

    const filtrarYOrdenarTickets = (tickets) => {
        return tickets
            .sort((a, b) => {
                if (a.pos !== b.pos) {
                    return a.pos - b.pos;
                }
                return new Date(a.fechaInicio.seconds * 1000 + a.fechaInicio.nanoseconds / 1000000) -
                    new Date(b.fechaInicio.seconds * 1000 + b.fechaInicio.nanoseconds / 1000000);
            })
            .map((ticket, ticketIndex, ticketsArray) => {
                const ticketAnterior = ticketsArray
                    .slice(0, ticketIndex)
                    .reverse()
                    .find(t => t.pos === ticket.pos);

                const diferenciaExtras = ticketAnterior
                    ? calcularDiferenciaExtras(ticket.extras, ticketAnterior.extras)
                    : ticket.extras;

                return {
                    ...ticket,
                    diferenciaExtras
                };
            });
    };

    const agruparTicketsPorEmpleado = (tickets) => {
        const agrupados = {};

        tickets.forEach(ticket => {
            const { empleado } = ticket;

            if (!agrupados[empleado]) {
                agrupados[empleado] = [];
            }

            agrupados[empleado].push(ticket);
        });

        return agrupados;
    };

    const agruparTicketsPorDia = (tickets) => {
        const agrupadosPorDia = {};
    
        tickets.forEach(ticket => {
            const fechaTicket = new Date(ticket.fechaInicio.seconds * 1000).toLocaleDateString();
            const empleado = ticket.empleado;
    
            if (!agrupadosPorDia[fechaTicket]) {
                agrupadosPorDia[fechaTicket] = {};
            }
    
            if (!agrupadosPorDia[fechaTicket][empleado]) {
                agrupadosPorDia[fechaTicket][empleado] = { ...ticket, extras: { ...ticket.extras }, diferenciaExtras: { ...ticket.diferenciaExtras } };
            } else {
                // Sumar los extras y diferenciaDeExtras al ticket existente del mismo día y empleado
                Object.keys(ticket.extras).forEach(extra => {
                    agrupadosPorDia[fechaTicket][empleado].extras[extra] = 
                        (agrupadosPorDia[fechaTicket][empleado].extras[extra] || 0) + ticket.extras[extra];
                });
    
                Object.keys(ticket.diferenciaExtras).forEach(extra => {
                    agrupadosPorDia[fechaTicket][empleado].diferenciaExtras[extra] = 
                        (agrupadosPorDia[fechaTicket][empleado].diferenciaExtras[extra] || 0) + ticket.diferenciaExtras[extra];
                });
            }
        });
    
        // Convertir agrupadosPorDia en un array de tickets
        const resultado = [];
        Object.values(agrupadosPorDia).forEach(ticketsPorDia => {
            Object.values(ticketsPorDia).forEach(ticket => {
                resultado.push(ticket);
            });
        });
    
        return resultado;
    };

    if (dias && dias.length > 0) {
        const todosLosTickets = dias.flatMap(dia => filtrarYOrdenarTickets(dia.tickets));

        const ticketsAgrupados = agruparTicketsPorEmpleado(todosLosTickets);

        // Agrupar tickets por empleado y luego por día
        const ticketsFinales = {};
        Object.keys(ticketsAgrupados).forEach(empleado => {
            ticketsFinales[empleado] = agruparTicketsPorDia(ticketsAgrupados[empleado]);
        });

        return ticketsFinales;
        
    }

    return {};
};
