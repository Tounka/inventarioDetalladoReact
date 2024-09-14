
import { PaginaCDPCrewUx, PaginaCDPGerenteUx } from "./PaginaCDPGerentesUx"
import TituloPrincipal from "../../../componentes/TituloPagina"
import Footer from "../../../componentes/Footer"
import { DisplayGenerico } from "../../../componentes/Displays"
import styled from "styled-components"

import { useNavigate } from "react-router-dom"

export const VisualizadorCDPs = () =>{
   
    

    return(
        <>
            <TituloPrincipal textoTitulo="CDPs"  />
                <PaginaCDPGerenteUx />
            <Footer textoPrincipalFooter='No Se Trata De Un Software Desarrollado Por ARCOS DORADOS.'  textoSecundarioFooter='Desarrollado por Ramon Castillo'  /> 
        </>
        
    )
}