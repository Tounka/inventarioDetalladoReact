
import { PaginaCDPCrewUx, PaginaCDPGerenteUx } from "./PaginaCDPGerentesUx"
import TituloPrincipal from "../../../componentes/TituloPagina"
import Footer from "../../../componentes/Footer"
import { DisplayGenerico } from "../../../componentes/Displays"
import styled from "styled-components"

import { useNavigate } from "react-router-dom"
import { useCdp } from "../../Contextos/ContextoCDP"

export const VisualizadorCDPs = () =>{
   const {tareasCDP} = useCdp();
    console.log("tareas",tareasCDP);

    return(
        <>
            <TituloPrincipal textoTitulo="CDPs"  />
                <PaginaCDPGerenteUx />
            <Footer textoPrincipalFooter='No Se Trata De Un Software Desarrollado Por ARCOS DORADOS.'  textoSecundarioFooter='Desarrollado por Ramon Castillo'  /> 
        </>
        
    )
}