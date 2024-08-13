import { PaginaTicketsExtrasUx } from "./TicketsExtrasUx"
import { DisplayGenerico } from "../../componentes/Displays"
import TituloPrincipal from "../../componentes/TituloPagina"
import Footer from "../../componentes/Footer"
import styled from "styled-components"
import { useEmpleados } from "../ContextoGeneral"
import { useEffect } from "react"
const DisplayTicketsExtras = styled(DisplayGenerico)`
    justify-content: start;
    padding: 20px;
    background-color: #112240;
`;

export const PaginaTicketsExtras = () =>{
    const {actualizarTickets, tickets} = useEmpleados();
    useEffect(() => {
        actualizarTickets();
    },[]);
    return(
        <>
        <TituloPrincipal textoTitulo="Tickets" />
        <DisplayTicketsExtras>
            

            <PaginaTicketsExtrasUx />

           
        </DisplayTicketsExtras>
        <Footer textoPrincipalFooter='No Se Trata De Un Software Desarrollado Por ARCOS DORADOS.'  textoSecundarioFooter='Desarrollado por Ramon Castillo'  />
        </>
    
    )
}