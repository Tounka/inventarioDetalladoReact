import styled from "styled-components";
import { useEmpleados } from "../ContextoGeneral";
import { useEffect, useState } from "react";
import { procesarTicketsExtras } from "../PaginaTicketsExtras/SeccionGraficas/ProcesadoGeneralData";
import { TablaResumen } from "./ComponentesGraficaAdmin/Tabla";
import { GraficaResumen } from "./ComponentesGraficaAdmin/Grafica";

export const PaginaGraficasAdminUx = () => {
    
    return (
        <>
            <TablaResumen  />
            <GraficaResumen />

        </>
    );
};
