import styled from "styled-components";
import { useEmpleados } from "../Contextos/ContextoGeneral";
import { useEffect, useState } from "react";
import { procesarTicketsExtras } from "../PaginaTicketsExtras/SeccionGraficas/ProcesadoGeneralData";
import { TablaResumen } from "./ComponentesGraficaAdmin/Tabla";
import { GraficaResumen } from "./ComponentesGraficaAdmin/Grafica";

const ContenedorGraficas = styled.div`
    display: flex;
    flex-wrap: wrap;
    width: 100%;
    justify-content: center;
    align-items: center;
    gap: 30px;

    @media (max-width: 600px) {
        width: 98%;
    }
`;
export const PaginaGraficasAdminUx = () => {
    
    return (
        <ContenedorGraficas>
            <TablaResumen  />
            <GraficaResumen />

        </ContenedorGraficas>
    );
};
