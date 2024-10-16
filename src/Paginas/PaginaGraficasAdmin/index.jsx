import { DisplayGenerico } from "../../componentes/Displays"
import TituloPrincipal from "../../componentes/TituloPagina"
import Footer from "../../componentes/Footer"
import styled from "styled-components"
import { useEmpleados } from "../Contextos/ContextoGeneral"
import { useEffect, useState } from "react"
import { procesarTickets, procesarTicketsExtras } from "../PaginaTicketsExtras/SeccionGraficas/ProcesadoGeneralData"
import { PaginaGraficasAdminUx } from "./PaginaGraficaAdminUx"
import { DataOrdenadaProvider } from "./DataGraficasAdminContext"

const DisplayTicketsExtras = styled(DisplayGenerico)`
    justify-content: start;
    padding: 20px;
    background-color: #112240;

    @media (max-width: 600px) {
        padding: 0px;
    }
`;

export const PaginaGraficasAdmin = () => {
    const { actualizarTickets, tickets, SeleccionarEmpleado } = useEmpleados();

  
    useEffect(() => {
        actualizarTickets();  
    }, []); 

    const arregloTickets = Object.values(tickets); // Asegúrate de que `tickets` sea un objeto como se espera.
    const dataBruta = procesarTickets(arregloTickets);



    return (
        <DataOrdenadaProvider dataBruta={dataBruta}>

            <TituloPrincipal textoTitulo="Admin Gráficas" />
            <DisplayTicketsExtras>
                <PaginaGraficasAdminUx  />
            </DisplayTicketsExtras>
            <Footer textoPrincipalFooter='No Se Trata De Un Software Desarrollado Por ARCOS DORADOS.' textoSecundarioFooter='Desarrollado por Ramon Castillo' />
        
        </DataOrdenadaProvider>
    )
}
