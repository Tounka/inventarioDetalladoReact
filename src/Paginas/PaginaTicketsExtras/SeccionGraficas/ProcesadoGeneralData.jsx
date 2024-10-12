// Función para procesar los tickets
import { ValoresExtras } from "../../Contextos/ContextoGeneral";

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
    
                // Convertir todos los extras a números
                const extrasNumericos = {};
                Object.keys(ticket.extras).forEach(key => {
                    extrasNumericos[key] = Number(ticket.extras[key]);
                });
    
                // Convertir también diferenciaExtras a números
                const diferenciaExtrasNumericos = {};
                Object.keys(diferenciaExtras).forEach(key => {
                    diferenciaExtrasNumericos[key] = Number(diferenciaExtras[key]);
                });
    
                return {
                    ...ticket,
                    extras: extrasNumericos,
                    diferenciaExtras: diferenciaExtrasNumericos
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


export const procesarTicketsExtras = (dataBruta, SeleccionarEmpleado) => {
    const acumulados = {};
    const extrasTotales = {};
    const conteoTickets = {}; // Nuevo objeto para contar los tickets por empleado
    

    for (const [empleadoID, tickets] of Object.entries(dataBruta)) {
        if (!acumulados[empleadoID]) {
            acumulados[empleadoID] = 0;
            extrasTotales[empleadoID] = {};
            conteoTickets[empleadoID] = 0; // Inicializar el conteo de tickets
        }

        tickets.forEach(ticket => {
            const { diferenciaExtras } = ticket;
            conteoTickets[empleadoID] += 1; // Incrementar el conteo de tickets para el empleado
            
            for (const [extra, cantidad] of Object.entries(diferenciaExtras)) {
                // Acumulación total de extras por empleado
                if (!extrasTotales[empleadoID][extra]) {
                    extrasTotales[empleadoID][extra] = 0;
                }
                extrasTotales[empleadoID][extra] += cantidad;

                // Acumulación total de extras
                acumulados[empleadoID] = (acumulados[empleadoID] || 0) + cantidad;
            }
        });
    }


    const calcularDineroEnExtras = (extras) => {
        let valor = 0;
        for (const extra in extras) {
            const valorIterativo = extras[extra] * (ValoresExtras[extra] || 0); // Asegúrate de que ValoresExtras tenga el valor para el extra
            valor += valorIterativo;
        }
        return valor;
    };

    // Convertir los IDs a nombres usando SeleccionarEmpleado
    const datosProcesadosConValorMonetario = Object.entries(extrasTotales).map(([id, objetoExtras]) => ({
        name: SeleccionarEmpleado(id).nombre,
        value: calcularDineroEnExtras(objetoExtras),
        id: id,
        cantidadTickets: conteoTickets[id] // Agregar la cantidad de tickets
    }));
    const datosProcesados = Object.entries(acumulados).map(([id, totalExtras]) => ({
        name: SeleccionarEmpleado(id).nombre,
        value: totalExtras,
        id: id,
        cantidadTickets: conteoTickets[id] // Agregar la cantidad de tickets
    }));

    return { datosProcesados, datosProcesadosConValorMonetario };
};

