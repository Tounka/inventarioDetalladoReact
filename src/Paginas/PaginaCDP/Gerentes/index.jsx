
import { PaginaCDPCrewUx, PaginaCDPGerenteUx } from "./PaginaCDPGerentesUx"
import TituloPrincipal from "../../../componentes/TituloPagina"
import Footer from "../../../componentes/Footer"


export const VisualizadorCDPs = () =>{
   
   
    return(
        <>
            <TituloPrincipal textoTitulo="CDPs"  />
                <PaginaCDPGerenteUx />
            <Footer textoPrincipalFooter='No Se Trata De Un Software Desarrollado Por ARCOS DORADOS.'  textoSecundarioFooter='Desarrollado por Ramon Castillo'  /> 
        </>
        
    )
}