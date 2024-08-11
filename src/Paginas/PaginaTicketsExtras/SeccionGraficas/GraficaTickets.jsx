import { useEffect, useState } from "react";
import styled from "styled-components";
import { GraficaPiePrincipalUx } from "./GraficaTicketsUx";
import { useEmpleados } from "../../ContextoGeneral";

const procesarTickets = (dataBruta, SeleccionarEmpleado) => {
    const acumulados = {};

    for (const [empleadoID, tickets] of Object.entries(dataBruta)) {
        if (!acumulados[empleadoID]) {
            acumulados[empleadoID] = 0;
        }

        tickets.forEach(ticket => {
            const { extras } = ticket;
            for (const cantidad of Object.values(extras)) {
                acumulados[empleadoID] += cantidad;
            }
        });
    }

    // Convertir los IDs a nombres usando SeleccionarEmpleado
    return Object.entries(acumulados).map(([id, totalExtras]) => ({
        name: SeleccionarEmpleado(id).nombre,
        value: totalExtras
    }));
};

const ContenedorGrafica = styled.div`
    width: 600px;
    height: 400px;
`;
const ContenedorGraficas = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;

`;

export const GraficaPiePrincipal = ({ dataBruta }) => {
    const [data, setData] = useState([]);
    const { SeleccionarEmpleado } = useEmpleados();

    useEffect(() => {
        if (dataBruta && SeleccionarEmpleado) {
            const datosProcesados = procesarTickets(dataBruta, SeleccionarEmpleado);
            setData(datosProcesados);
        }
    }, [dataBruta, SeleccionarEmpleado]);

    return (
        <ContenedorGraficas>
                <ContenedorGrafica>
                    <GraficaPiePrincipalUx data={data} />
                </ContenedorGrafica>

        </ContenedorGraficas>

    );
};
